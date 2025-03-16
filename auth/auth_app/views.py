import requests
import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        # Отправляем запрос в сервис users для создания пользователя
        users_service_url = "http://users:8000/user/register/"
        print(users_service_url)
        response = requests.post(users_service_url, data=json.dumps(request.data), headers={"Content-Type": "application/json"})
        print(response)

        if response.status_code == 201:
            user_data = response.json()
            user_id = user_data["id"]
            username = user_data['username']

            # Создаём JWT-токен для нового пользователя
            refresh = RefreshToken()
            refresh['username'] = username

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                'username': str(username)
            }, status=status.HTTP_201_CREATED)

        return Response(response.json(), status=response.status_code)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        # Отправляем запрос в users-сервис для проверки логина
        users_service_url = "http://users:8000/user/validate/"
        response = requests.post(users_service_url, json=request.data)

        if response.status_code == 200:
            user_data = response.json()
            user_id = user_data["id"]
            username = user_data['username']

            # Выдаём JWT-токен
            refresh = RefreshToken()
            refresh['username'] = username

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": str(username)
            })

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class ValidToken(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        try:
            access_token = AccessToken(request.data.get("token"))
            return Response({'payload': access_token.payload})
        except Exception as e:
            return Response({'error', str(e)}, status=status.HTTP_401_UNAUTHORIZED)

    # def get(self, request):
    #     return Response({'status': '200'})
