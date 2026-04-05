from django.db.models import Avg, Count
from rest_framework import serializers

from .models import Destination, QuoteRequest, Review, TourPackage


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "hero_image",
            "highlights",
            "best_time_to_visit",
            "created_at",
            "updated_at",
        ]


class TourCardSerializer(serializers.ModelSerializer):
    destinations = DestinationSerializer(many=True, read_only=True)

    class Meta:
        model = TourPackage
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "duration_days",
            "duration_nights",
            "price_from",
            "price_to",
            "currency",
            "featured_image",
            "destinations",
            "travel_style",
            "private_or_shared",
            "accommodation_type",
            "is_featured",
            "is_active",
        ]


class TourDetailSerializer(TourCardSerializer):
    class Meta(TourCardSerializer.Meta):
        fields = TourCardSerializer.Meta.fields + [
            "full_description",
            "gallery_images",
            "itinerary_json",
            "inclusions",
            "exclusions",
            "created_at",
            "updated_at",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "guest_name",
            "guest_country",
            "rating",
            "review_text",
            "source",
            "review_date",
            "is_approved",
            "created_at",
            "updated_at",
        ]


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "country",
            "travel_start",
            "travel_end",
            "travel_month",
            "adults",
            "children",
            "starting_location",
            "duration_days",
            "destination_interest",
            "trip_type",
            "accommodation_level",
            "private_or_shared",
            "budget_min",
            "budget_max",
            "message",
            "is_verified",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class QuoteCreateSerializer(serializers.Serializer):
    destination_interest = serializers.ListField(child=serializers.CharField(), min_length=1)
    trip_type = serializers.CharField(max_length=80)
    travel_month = serializers.CharField(max_length=40, required=False, allow_blank=True)
    travel_start = serializers.DateField(required=False, allow_null=True)
    travel_end = serializers.DateField(required=False, allow_null=True)
    adults = serializers.IntegerField(min_value=1)
    children = serializers.IntegerField(min_value=0)
    starting_location = serializers.CharField(max_length=120, required=False, allow_blank=True)
    duration_days = serializers.IntegerField(min_value=1)
    accommodation_level = serializers.CharField(max_length=80)
    private_or_shared = serializers.CharField(max_length=20)
    budget_min = serializers.IntegerField(min_value=0)
    budget_max = serializers.IntegerField(min_value=0)
    full_name = serializers.CharField(max_length=140)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=60, required=False, allow_blank=True)
    country = serializers.CharField(max_length=120, required=False, allow_blank=True)
    message = serializers.CharField(required=False, allow_blank=True)


class QuoteVerifySerializer(serializers.Serializer):
    quote_id = serializers.IntegerField()
    code = serializers.CharField(min_length=4, max_length=4)


class QuoteResendSerializer(serializers.Serializer):
    quote_id = serializers.IntegerField()


def get_review_summary() -> dict:
    stats = Review.objects.filter(is_approved=True).aggregate(
        average_rating=Avg("rating"),
        total_reviews=Count("id"),
    )
    return {
        "average_rating": round(stats["average_rating"] or 0, 1),
        "total_reviews": stats["total_reviews"] or 0,
    }
