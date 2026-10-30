from rest_framework import serializers
from .models import User, Alert, MicroReview

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_verified_local', 'risk_tolerance')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class AlertSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')
    is_verified_user = serializers.ReadOnlyField(source='created_by.is_verified_local')

    class Meta:
        model = Alert
        fields = '__all__'
        read_only_fields = ('created_by', 'is_official')

class MicroReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    user_verified = serializers.ReadOnlyField(source='user.is_verified_local')

    class Meta:
        model = MicroReview
        fields = '__all__'
        read_only_fields = ('user', 'upvotes')