from django.contrib import admin
from .models import KisiiReports, UserProfile

@admin.register(KisiiReports)
class KisiiReportsAdmin(admin.ModelAdmin):
    list_display = ('id', 'lat', 'lon', 'grivance_description', 'category_of_complaint', 
                    'category_of_grivance', 'date', 'time', 'status', 'user')
    list_filter = ('status', 'category_of_complaint', 'category_of_grivance', 'date')
    search_fields = ('grivance_description', 'category_of_complaint', 'category_of_grivance', 'user__username')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'firstname', 'lastname', 'phonenumber', 'residency', 'ward', 'communicationMode')
    search_fields = ('user__username', 'firstname', 'lastname', 'phonenumber', 'ward')
    list_filter = ('residency', 'communicationMode')

