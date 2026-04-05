from django.db import models
from django.utils.text import slugify


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Destination(TimestampedModel):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    description = models.TextField()
    hero_image = models.URLField()
    highlights = models.JSONField(default=list, blank=True)
    best_time_to_visit = models.TextField()

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class TourPackage(TimestampedModel):
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    short_description = models.TextField()
    full_description = models.TextField()
    duration_days = models.PositiveIntegerField()
    duration_nights = models.PositiveIntegerField()
    price_from = models.DecimalField(max_digits=10, decimal_places=2)
    price_to = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=8, default="USD")
    featured_image = models.URLField()
    gallery_images = models.JSONField(default=list, blank=True)
    destinations = models.ManyToManyField(Destination, related_name="tour_packages")
    travel_style = models.CharField(max_length=80)
    private_or_shared = models.CharField(max_length=20)
    accommodation_type = models.CharField(max_length=80)
    itinerary_json = models.JSONField(default=list, blank=True)
    inclusions = models.JSONField(default=list, blank=True)
    exclusions = models.JSONField(default=list, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["duration_days", "price_from"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class Review(TimestampedModel):
    SOURCE_CHOICES = [
        ("Google", "Google"),
        ("TripAdvisor", "TripAdvisor"),
        ("Direct Guest", "Direct Guest"),
    ]

    guest_name = models.CharField(max_length=120)
    guest_country = models.CharField(max_length=120)
    rating = models.PositiveSmallIntegerField(default=5)
    review_text = models.TextField()
    source = models.CharField(max_length=40, choices=SOURCE_CHOICES)
    review_date = models.DateField()
    is_approved = models.BooleanField(default=True)

    class Meta:
        ordering = ["-review_date", "-created_at"]

    def __str__(self) -> str:
        return f"{self.guest_name} ({self.rating}/5)"


class QuoteRequest(TimestampedModel):
    STATUS_CHOICES = [
        ("new", "New"),
        ("unverified", "Unverified"),
        ("verified", "Verified"),
        ("contacted", "Contacted"),
        ("quote_sent", "Quote Sent"),
        ("booked", "Booked"),
        ("closed", "Closed"),
    ]

    full_name = models.CharField(max_length=140)
    email = models.EmailField()
    phone = models.CharField(max_length=60, blank=True)
    country = models.CharField(max_length=120, blank=True)
    travel_start = models.DateField(null=True, blank=True)
    travel_end = models.DateField(null=True, blank=True)
    travel_month = models.CharField(max_length=40, blank=True)
    adults = models.PositiveIntegerField(default=2)
    children = models.PositiveIntegerField(default=0)
    starting_location = models.CharField(max_length=120, blank=True)
    duration_days = models.PositiveIntegerField(default=3)
    destination_interest = models.JSONField(default=list, blank=True)
    trip_type = models.CharField(max_length=80)
    accommodation_level = models.CharField(max_length=80)
    private_or_shared = models.CharField(max_length=20)
    budget_min = models.PositiveIntegerField(default=0)
    budget_max = models.PositiveIntegerField(default=0)
    message = models.TextField(blank=True)
    verification_code = models.CharField(max_length=4, blank=True)
    verification_expires_at = models.DateTimeField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="unverified")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.full_name} - {self.email}"
