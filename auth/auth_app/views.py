import requests
import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenRefreshView

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print("COOKIES:", request.COOKIES)
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token is missing in cookies'},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.data['refresh'] = refresh_token
        return super().post(request, *args, **kwargs)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        users_service_url = "http://users:8000/user/validate/"
        response = requests.post(users_service_url, json=request.data)

        if response.status_code == 200:
            user_data = response.json()
            user_id = user_data["id"]
            username = user_data['username']

            # Выдаём JWT-токен
            refresh = RefreshToken()
            refresh['username'] = username
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                "access": access_token,
                "username": username
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,  # Только для HTTPS
                samesite='None',
                max_age=60 * 60 * 24 * 30,  # 30 дней
                # path='/api/auth/refresh/'  # Доступно только для эндпоинта refresh
            )
            return response

        return Response(response.json(), status=status.HTTP_401_UNAUTHORIZED)


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(
                {"error": "Refresh token is missing"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            return Response({
                "access": access_token
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_401_UNAUTHORIZED
                )

class LogoutView(APIView):
    def post(self, request):
        response = Response(
            {"message": "Successfully logged out"},
            status=status.HTTP_200_OK
        )
        
        # Удаляем cookie
        response.delete_cookie('refresh_token')
        return response


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

class VerifyTokenView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        token = request.data.get("token")
        print(token)
        if not token:
            return Response(
                {'error': 'Token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            access_token = AccessToken(token)
            print(access_token)
            return Response({
                'payload': access_token.payload,
                'username': access_token.payload.get('username'),
            })
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )