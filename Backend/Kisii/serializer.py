from rest_framework import serializers
from .models import KisiiReports, UserProfile
from django.contrib.auth.models import User
from datetime import datetime
from django.db import transaction

class UserRegistrationSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    firstname = serializers.CharField(write_only=True)
    lastname = serializers.CharField(write_only=True)
    phonenumber = serializers.CharField(write_only=True)
    residency = serializers.ChoiceField(choices=[('Resident', 'Resident'), ('Non-resident', 'Non-resident')], write_only=True)
    ward = serializers.CharField(required=False, allow_blank=True, write_only=True) 
    communicationMode = serializers.ChoiceField(choices=[('Call', 'Call'), ('SMS', 'SMS'), ('WhatsApp', 'WhatsApp')], write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'firstname', 'lastname', 'phonenumber', 'residency', 'ward', 'communicationMode']

    @transaction.atomic
    def create(self, validated_data):
        # Extract profile data
        profile_data = {
            'firstname': validated_data.pop('firstname'),
            'lastname': validated_data.pop('lastname'),
            'phonenumber': validated_data.pop('phonenumber'),
            'residency': validated_data.pop('residency'),
            'ward': validated_data.pop('ward'),
            'communicationMode': validated_data.pop('communicationMode')
        }

        # Set `ward` to None if `residency` is 'Non-resident'
        if profile_data['residency'] == 'Non-resident':
            profile_data['ward'] = None

        # Create user
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        # Create user profile
        UserProfile.objects.create(user=user, **profile_data)

        return user

    def to_representation(self, instance):
        # Custom representation to include UserProfile fields
        representation = super().to_representation(instance)
        
        # Add UserProfile fields to the representation
        user_profile = UserProfile.objects.get(user=instance)
        representation['firstname'] = user_profile.firstname
        representation['lastname'] = user_profile.lastname
        representation['phonenumber'] = user_profile.phonenumber
        representation['residency'] = user_profile.residency
        representation['ward'] = user_profile.ward
        representation['communicationMode'] = user_profile.communicationMode
        
        return representation

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['firstname', 'lastname', 'phonenumber', 'residency', 'ward', 'communicationMode']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'profile']
        
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
        read_only_fields = ['id', 'date', 'status']  # Optional: make them read-only
