from rest_framework import serializers
from .models import KisiiReports
from django.contrib.auth.models import User
from datetime import datetime

class UserRegistrationSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['username','email' , 'password']
        
    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class KisiiReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = KisiiReports
        fields = [
            'id',  # Include the ID field
            'lat',
            'lon',
            'grivance_description',
            'category_of_complaint',
            'category_of_grivance',
            'date',
            'status'
        ]
        read_only_fields = ['id', 'date','status']  # Optional: make them read-only