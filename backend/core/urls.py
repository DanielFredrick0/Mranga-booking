from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    # Support Vercel Services routePrefix="/api" while keeping local "/api/*" routes.
    path("", include("api.urls")),
    path("api/", include("api.urls")),
    path("admin/", admin.site.urls),
]
