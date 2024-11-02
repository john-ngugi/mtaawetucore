# your_app/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrStaff(BasePermission):
    """
    Custom permission to only allow admin or staff users to access a view.
    """
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.is_superuser)