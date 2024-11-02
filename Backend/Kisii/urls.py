
from django.urls import path
from .views import * 



urlpatterns = [
    path('token/', CustomTokenObtainpairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('reports/',get_report),
    path("logout/",logout),
    path("register/",register),
    path("authenticated/",is_authenticated),
    path("make_report/",make_report),
    path('reports/all/', get_all_reports, name='get_all_reports'),
    path('getUserInfo/',getUserInfoIfAuth,name='get-user-info'),
]

