import requests
#from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model


AdminUser = get_user_model()

USERS_SERVICE_URL = 'http://users:8000/'
PRODUCTS_SERVICE_URL = 'http://product:8000/'
REVIEWS_SERVICE_URL = 'http://review:8000/'
CHAT_HTTP_SERVICE_URL = 'http://chat_http:8000/'

# class checkAdminView(APIView):
#     permission_classes = []

#     def post(self, request):
#         print(request.data)

#         response = requests.get(f"")

#         username = request.data.get('username')

#         if AdminUser.objects.filter(username = username).exists():
#             return Response({'message': 'ok'}, status=200)
#         return Response({'error': 'Forbidden'}, status=403)


# def get_users(request):
#     """Получение списка пользователей через API users-сервиса"""

#     response = requests.get(f"{USERS_SERVICE_URL}/users/")
#     return JsonResponse(response.json(), safe=False)

# def get_products(request):
#     """Получение списка товаров через API products-сервиса"""
#     response = requests.get(f"{PRODUCTS_SERVICE_URL}/products/")
#     return JsonResponse(response.json(), safe=False)

# def get_reviews(request):
#     """Получение списка отзывов через API reviews-сервиса"""
#     response = requests.get(f"{REVIEWS_SERVICE_URL}/reviews/")
#     return JsonResponse(response.json(), safe=False)


def check_user(username):
    #headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{USERS_SERVICE_URL}users/{username}/") #, headers=headers
    try:
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': f"Request failed: {e}"}
    except json.JSONDecodeError:
        # Если не удалось декодировать JSON, возвращаем сырой текст ответа
        return {'error': "Failed to decode JSON response", 'text': response.text}

class IdenteficateUserView(APIView):
    def post(self, request):
        print(request.data)
        response = check_user(request.data.get('username'))
        print(response)
        return Response({'data': response}, status=200)

class UsersView(APIView):
    def get(self, request):
        response = requests.get(f"{USERS_SERVICE_URL}users/")
        return JsonResponse(response.json(), safe=False)

class MessagesView(APIView):
    def get(self, request):
        response = requests.get(f"{CHAT_HTTP_SERVICE_URL}messages/")
        return JsonResponse(response.json(), safe=False)

