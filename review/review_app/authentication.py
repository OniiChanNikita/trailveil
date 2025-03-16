from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import requests

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Получаем токен из заголовка
        header = request.headers.get('Authorization')
        if not header:
            return None

        try:
            token = header.split(' ')[1]  # JWT token
        except IndexError:
            raise AuthenticationFailed('Authorization token not found')

        # Декодируем токен
        validated_token = self.get_validated_token(token)

        # Извлекаем user_id из токена
        user_id = validated_token['user_id']

        return (user_id, validated_token)
