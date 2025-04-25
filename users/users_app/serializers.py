from rest_framework import serializers
from django.contrib.auth import get_user_model
from users_app.models import Permission, Role

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name', 'description']

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['code', 'description']

class UserSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    role = RoleSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'permissions', 'role', 'wishlist', 'created_at']

class StaffMeSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    role = RoleSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', "role", "permissions"]

class StaffUsersSerializer(serializers.ModelSerializer):
    role = RoleSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', "role", "is_active"]
        


