from .models import CustomUser
from rest_framework import serializers

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", 'password',  "first_name", "last_name", "is_superuser", "is_staff", "is_active", "date_joined"]