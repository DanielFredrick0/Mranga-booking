import random
from datetime import timedelta

from django.conf import settings
from django.db import connection
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .emailing import render_email, send_email
from .models import Destination, QuoteRequest, Review, TourPackage
from .permissions import HasAdminApiKey
from .serializers import (
    DestinationSerializer,
    QuoteCreateSerializer,
    QuoteRequestSerializer,
    QuoteResendSerializer,
    QuoteVerifySerializer,
    ReviewSerializer,
    TourCardSerializer,
    TourDetailSerializer,
    get_review_summary,
)


def generate_code() -> str:
    return f"{random.randint(1000, 9999)}"


class HomeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        featured_packages = TourPackage.objects.filter(is_featured=True, is_active=True).prefetch_related("destinations")[:6]
        destinations = Destination.objects.all()[:6]
        reviews = Review.objects.filter(is_approved=True)[:6]
        return Response(
            {
                "featuredPackages": TourCardSerializer(featured_packages, many=True).data,
                "destinations": DestinationSerializer(destinations, many=True).data,
                "reviews": ReviewSerializer(reviews, many=True).data,
                "reviewSummary": get_review_summary(),
                "stats": [
                    {"label": "Safari itineraries crafted", "value": "2,400+"},
                    {"label": "Average first response", "value": "< 30 min"},
                    {"label": "Local destination experts", "value": "6"},
                    {"label": "Guest rating", "value": "4.9/5"},
                ],
            }
        )


class TourListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = TourPackage.objects.filter(is_active=True).prefetch_related("destinations")
        destination = request.query_params.get("destination")
        trip_type = request.query_params.get("tripType")
        private_or_shared = request.query_params.get("privateOrShared")
        accommodation = request.query_params.get("accommodationType")
        duration = request.query_params.get("duration")
        budget = request.query_params.get("budget")
        sort = request.query_params.get("sort", "featured")

        if destination:
            queryset = queryset.filter(destinations__slug=destination)
        if trip_type:
            queryset = queryset.filter(travel_style__iexact=trip_type)
        if private_or_shared:
            queryset = queryset.filter(private_or_shared__iexact=private_or_shared)
        if accommodation:
            queryset = queryset.filter(accommodation_type__iexact=accommodation)
        if duration == "1-3":
            queryset = queryset.filter(duration_days__lte=3)
        elif duration == "4-6":
            queryset = queryset.filter(duration_days__gte=4, duration_days__lte=6)
        elif duration == "7+":
            queryset = queryset.filter(duration_days__gte=7)
        if budget == "budget":
            queryset = queryset.filter(price_from__lt=900)
        elif budget == "mid":
            queryset = queryset.filter(price_from__gte=900, price_from__lte=1800)
        elif budget == "premium":
            queryset = queryset.filter(price_from__gt=1800)

        if sort == "price_low":
            queryset = queryset.order_by("price_from")
        elif sort == "price_high":
            queryset = queryset.order_by("-price_from")
        elif sort == "duration":
            queryset = queryset.order_by("duration_days", "price_from")
        else:
            queryset = queryset.order_by("-is_featured", "price_from")

        return Response({"results": TourCardSerializer(queryset.distinct(), many=True).data})


class TourDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug: str):
        package = get_object_or_404(TourPackage.objects.prefetch_related("destinations"), slug=slug, is_active=True)
        related = (
            TourPackage.objects.filter(is_active=True, destinations__in=package.destinations.all())
            .exclude(id=package.id)
            .distinct()[:3]
        )
        return Response(
            {
                "package": TourDetailSerializer(package).data,
                "relatedTours": TourCardSerializer(related, many=True).data,
                "reviewSummary": get_review_summary(),
            }
        )


class DestinationListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"results": DestinationSerializer(Destination.objects.all(), many=True).data})


class DestinationDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug: str):
        destination = get_object_or_404(Destination, slug=slug)
        related = TourPackage.objects.filter(destinations=destination, is_active=True).prefetch_related("destinations")
        return Response(
            {
                "destination": DestinationSerializer(destination).data,
                "relatedTours": TourCardSerializer(related, many=True).data,
            }
        )


class ReviewListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        reviews = Review.objects.filter(is_approved=True)
        return Response({"results": ReviewSerializer(reviews, many=True).data, "summary": get_review_summary()})


class QuoteCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = QuoteCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = generate_code()
        quote = QuoteRequest.objects.create(
            **serializer.validated_data,
            verification_code=code,
            verification_expires_at=timezone.now() + timedelta(minutes=settings.QUOTE_VERIFICATION_MINUTES),
            status="unverified",
            is_verified=False,
        )

        html = render_email(
            "verification_code.html",
            {
                "full_name": quote.full_name,
                "code": code,
                "site_name": settings.SITE_NAME,
                "minutes": settings.QUOTE_VERIFICATION_MINUTES,
                "frontend_url": settings.FRONTEND_URL,
            },
        )
        send_email(
            subject="Verify your Mranga safari inquiry",
            to_email=quote.email,
            html=html,
            text=f"Your Mranga verification code is {code}.",
        )

        return Response(
            {
                "quoteId": quote.id,
                "email": quote.email,
                "status": quote.status,
                "message": "Verification code sent successfully.",
            },
            status=status.HTTP_201_CREATED,
        )


class QuoteVerifyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = QuoteVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = get_object_or_404(QuoteRequest, id=serializer.validated_data["quote_id"])

        if quote.is_verified:
            return Response({"message": "This inquiry is already verified.", "quoteId": quote.id})
        if not quote.verification_expires_at or quote.verification_expires_at < timezone.now():
            return Response({"message": "Verification code expired."}, status=status.HTTP_400_BAD_REQUEST)
        if quote.verification_code != serializer.validated_data["code"]:
            return Response({"message": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)

        quote.is_verified = True
        quote.status = "verified"
        quote.verification_code = ""
        quote.save(update_fields=["is_verified", "status", "verification_code", "updated_at"])

        customer_html = render_email(
            "quote_confirmation.html",
            {
                "full_name": quote.full_name,
                "site_name": settings.SITE_NAME,
                "whatsapp_number": settings.WHATSAPP_NUMBER.replace("+", ""),
                "frontend_url": settings.FRONTEND_URL,
            },
        )
        send_email(
            subject="Your safari inquiry is confirmed",
            to_email=quote.email,
            html=customer_html,
            text="Your inquiry is confirmed. Our safari planners will respond soon.",
        )

        admin_html = render_email(
            "admin_new_inquiry.html",
            {
                "full_name": quote.full_name,
                "email": quote.email,
                "phone": quote.phone or "Not provided",
                "trip_type": quote.trip_type,
                "destinations": ", ".join(quote.destination_interest),
                "travel_month": quote.travel_month or "Flexible dates",
                "frontend_url": settings.FRONTEND_URL,
            },
        )
        send_email(
            subject="New verified safari inquiry",
            to_email=settings.ADMIN_NOTIFICATION_EMAIL,
            html=admin_html,
            text=f"New verified safari inquiry from {quote.full_name}.",
        )

        return Response({"quoteId": quote.id, "status": quote.status, "isVerified": True})


class QuoteResendView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = QuoteResendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = get_object_or_404(QuoteRequest, id=serializer.validated_data["quote_id"])
        code = generate_code()
        quote.verification_code = code
        quote.verification_expires_at = timezone.now() + timedelta(minutes=settings.QUOTE_VERIFICATION_MINUTES)
        quote.status = "unverified"
        quote.save(update_fields=["verification_code", "verification_expires_at", "status", "updated_at"])

        html = render_email(
            "verification_code.html",
            {
                "full_name": quote.full_name,
                "code": code,
                "site_name": settings.SITE_NAME,
                "minutes": settings.QUOTE_VERIFICATION_MINUTES,
                "frontend_url": settings.FRONTEND_URL,
            },
        )
        send_email(
            subject="Your new Mranga verification code",
            to_email=quote.email,
            html=html,
            text=f"Your new verification code is {code}.",
        )
        return Response({"message": "Verification code resent successfully."})


class QuoteSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, quote_id: int):
        quote = get_object_or_404(QuoteRequest, id=quote_id)
        return Response(
            {
                "quote": {
                    "id": quote.id,
                    "fullName": quote.full_name,
                    "email": quote.email,
                    "destinationInterest": quote.destination_interest,
                    "tripType": quote.trip_type,
                    "travelMonth": quote.travel_month,
                    "adults": quote.adults,
                    "children": quote.children,
                    "durationDays": quote.duration_days,
                    "status": quote.status,
                    "isVerified": quote.is_verified,
                }
            }
        )


class AdminStatsView(APIView):
    permission_classes = [HasAdminApiKey]

    def get(self, request):
        return Response(
            {
                "tours": TourPackage.objects.count(),
                "destinations": Destination.objects.count(),
                "reviews": Review.objects.count(),
                "leads": QuoteRequest.objects.count(),
                "verifiedLeads": QuoteRequest.objects.filter(is_verified=True).count(),
                "recentLeads": QuoteRequestSerializer(QuoteRequest.objects.all()[:5], many=True).data,
            }
        )


class AdminTourViewSet(viewsets.ModelViewSet):
    queryset = TourPackage.objects.prefetch_related("destinations").all()
    serializer_class = TourDetailSerializer
    permission_classes = [HasAdminApiKey]


class AdminDestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [HasAdminApiKey]


class AdminReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [HasAdminApiKey]


class AdminQuoteViewSet(viewsets.ModelViewSet):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [HasAdminApiKey]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get("search")
        status_value = self.request.query_params.get("status")
        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(email__icontains=search)
                | Q(phone__icontains=search)
                | Q(country__icontains=search)
            )
        if status_value:
            queryset = queryset.filter(status=status_value)
        return queryset


@api_view(["GET"])
@permission_classes([AllowAny])
def healthcheck(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        return Response(
            {
                "status": "ok",
                "service": settings.SITE_NAME,
                "database": "ok",
                "counts": {
                    "destinations": Destination.objects.count(),
                    "tours": TourPackage.objects.count(),
                    "reviews": Review.objects.count(),
                },
            }
        )
    except Exception as exc:
        payload = {"status": "degraded", "service": settings.SITE_NAME, "database": "error"}
        if settings.DEBUG:
            payload["detail"] = str(exc)
        return Response(payload, status=status.HTTP_503_SERVICE_UNAVAILABLE)
