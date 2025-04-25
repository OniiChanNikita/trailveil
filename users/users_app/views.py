# from django.shortcuts import render

# Create your views here.


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .models import User

# class ProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         serializer = ProfileSerializer(Profile.objects.get(user_id=user.user_id))
#         return Response(serializer.data)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from users_app.authentication import BearerTokenAuth 

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from .serializers import RegisterSerializer, RoleSerializer, PermissionSerializer, UserSerializer, StaffMeSerializer, StaffUsersSerializer
from django.shortcuts import get_object_or_404
from .models import Permission, Role

User = get_user_model()

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"id": user.id, "username": user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BearerTokenAuth]

    def get(self, request):
        username = request.user.username

        user = get_object_or_404(User, username=username)

        permissions = Permission.objects.filter(roles=user.role)

        user_serializer = UserSerializer(user, many=False).data
        permissions_serializer = PermissionSerializer(permissions, many=True).data

        user_serializer['permissions'] = permissions_serializer
        return Response(user_serializer)



class GetUsersView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        users = User.objects.all()
        return Response(UserSerializer(users, many=True).data)


class ValidateLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
            if check_password(password, user.password):
                return Response({"id": user.id, 'username': user.username}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            pass

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class StaffMeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print(request.user.username)
        user = User.objects.get(username=request.user.username)
        permissions = Permission.objects.filter(roles=user.role)

        user_serializer = StaffMeSerializer(user, many=False).data
        permissions_serializer = PermissionSerializer(permissions, many=True).data

        user_serializer['permissions'] = permissions_serializer
        return Response(user_serializer)

class StaffUsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print(request.data)
        if request.data.get("userId")!=None:
            user = User.objects.get(id=request.data.get("userId"))

        else:
            user = User.objects.all()

        return Response(StaffUsersSerializer(user, many=True).data)