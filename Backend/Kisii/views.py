from django.shortcuts import render
from django.contrib.auth.models import User
from .models import KisiiReports
from .serializer import KisiiReportsSerializer,UserRegistrationSerializers

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


import json
# Create your views here.

class CustomTokenObtainpairView(TokenObtainPairView):    
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens["access"]
            print(access_token)
            refresh_token = tokens["refresh"]
            res = Response()
            res.data = {"Success": True}
            
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            
            return res
        except:
            return Response({"Success":False})
        
        
class CustomTokenRefreshView(TokenRefreshView):  
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            
            request.data['refresh'] = refresh_token
            
            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens["access"]
            
            res = Response()
            
            res.data = {"Refreshed":True}
            
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            
            return res
        except:
            return Response({"Success":False})   
        
        
        
        
@api_view(["POST"])

def logout(request):
    try:
        res = Response()
        res.data = {"Success":True}
        res.delete_cookie("access_token", path="/", samesite="None")	
        res.delete_cookie("refresh_token", path="/", samesite="None")
        return res
    except:    
        return Response({"Success":False})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({"Authenticated":True})       


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_report(request): 
    user = request.user
    reports = KisiiReports.objects.filter(user=user)
    serializer = KisiiReportsSerializer(reports, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_report(request):
    serializer = KisiiReportsSerializer(data= request.data)   
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data)
    return Response({"Invalid":"not good data"}, status=400)


    # data = json.loads(request.body)
    # lat = data.get('lat')
    # lon= data.get('lon')
    # grivance_description = data.get('grivance_description')
    # category_of_complaint = data.get('category_of_complaint')
    # category_of_grivance = data.get('category_of_grivance')
    # user = request.user
    # if category_of_complaint and category_of_grivance and user and lat and lon and grivance_description:
    #     KisiiReports.objects.create(lat=lat,lon=lon,grivance_description=grivance_description,category_of_complaint=category_of_complaint,category_of_grivance=category_of_grivance,user=user)
    # Response()