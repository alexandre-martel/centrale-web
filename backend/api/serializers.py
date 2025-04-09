from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        """
        Create a new user with the given validated data.
        """
        user = User.objects.create_user(**validated_data)
        return user