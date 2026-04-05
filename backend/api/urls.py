from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminDestinationViewSet,
    AdminQuoteViewSet,
    AdminReviewViewSet,
    AdminStatsView,
    AdminTourViewSet,
    DestinationDetailView,
    DestinationListView,
    HomeView,
    QuoteCreateView,
    QuoteResendView,
    QuoteSummaryView,
    QuoteVerifyView,
    ReviewListView,
    TourDetailView,
    TourListView,
    healthcheck,
)


router = DefaultRouter()
router.register("admin/tours", AdminTourViewSet, basename="admin-tours")
router.register("admin/destinations", AdminDestinationViewSet, basename="admin-destinations")
router.register("admin/reviews", AdminReviewViewSet, basename="admin-reviews")
router.register("admin/quotes", AdminQuoteViewSet, basename="admin-quotes")


urlpatterns = [
    path("health/", healthcheck),
    path("site/home/", HomeView.as_view()),
    path("tours/", TourListView.as_view()),
    path("tours/<slug:slug>/", TourDetailView.as_view()),
    path("destinations/", DestinationListView.as_view()),
    path("destinations/<slug:slug>/", DestinationDetailView.as_view()),
    path("reviews/", ReviewListView.as_view()),
    path("quotes/", QuoteCreateView.as_view()),
    path("quotes/verify/", QuoteVerifyView.as_view()),
    path("quotes/resend/", QuoteResendView.as_view()),
    path("quotes/<int:quote_id>/summary/", QuoteSummaryView.as_view()),
    path("admin/stats/", AdminStatsView.as_view()),
    path("", include(router.urls)),
]
