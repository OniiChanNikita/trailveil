# authentication.py
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
import requests
from django.conf import settings

class BearerTokenAuth(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        
        try:
            # Отправляем запрос в микросервис auth
            response = requests.post(
                f"http://auth:8000/valid/",
                json={'token': token},
                headers={'Content-Type': 'application/json'},
                timeout=2  # Таймаут 2 секунды
            )

            if response.status_code != 200:
                raise AuthenticationFailed('Invalid token')

            payload = response.json().get('payload')
            print(payload)
            if not payload or 'username' not in payload:
                raise AuthenticationFailed('Invalid token payload')

            # Создаем "анонимный" пользователь с данными из токена
            user = type('User', (), {
                'is_authenticated': True,
                'username': payload['username'],
                'payload': payload  # Все данные из токена
            })()
            
            return (user, None)  # Возвращаем пользователя и None для auth

        except requests.Timeout:
            raise AuthenticationFailed('Auth service timeout')
        except requests.ConnectionError:
            raise AuthenticationFailed('Auth service unavailable')
        except Exception as e:
            raise AuthenticationFailed(f'Authentication failed: {str(e)}')