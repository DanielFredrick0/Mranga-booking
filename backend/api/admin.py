from django.contrib import admin

from .models import Destination, QuoteRequest, Review, TourPackage


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "updated_at")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "duration_days",
        "price_from",
        "travel_style",
        "private_or_shared",
        "is_featured",
        "is_active",
    )
    search_fields = ("title", "short_description", "full_description")
    list_filter = ("is_featured", "is_active", "travel_style", "private_or_shared", "accommodation_type")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("destinations",)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("guest_name", "guest_country", "rating", "source", "review_date", "is_approved")
    search_fields = ("guest_name", "review_text")
    list_filter = ("source", "rating", "is_approved")


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "trip_type", "travel_month", "status", "is_verified", "created_at")
    search_fields = ("full_name", "email", "phone", "country")
    list_filter = ("status", "is_verified", "trip_type", "private_or_shared", "accommodation_level")
