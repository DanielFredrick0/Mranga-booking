from django.conf import settings
from rest_framework.permissions import BasePermission


class HasAdminApiKey(BasePermission):
    def has_permission(self, request, view):
        return request.headers.get("x-admin-key") == settings.ADMIN_API_KEY
