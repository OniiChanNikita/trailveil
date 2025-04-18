# # middleware.py
# from django.utils.deprecation import MiddlewareMixin
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.exceptions import AuthenticationFailed

# class JWTAuthenticationMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         # Пропускаем аутентификацию для определённых путей
#         if request.path in ['/login/', '/refresh/', '/register/']:
#             return None

#         # Проверяем токен из заголовка или cookie
#         auth_header = request.META.get('HTTP_AUTHORIZATION')
#         jwt_token = None

#         if auth_header and auth_header.startswith('Bearer '):
#             jwt_token = auth_header.split(' ')[1]
#         elif 'access_token' in request.COOKIES:
#             jwt_token = request.COOKIES['access_token']

#         if jwt_token:
#             try:
#                 jwt_auth = JWTAuthentication()
#                 validated_token = jwt_auth.get_validated_token(jwt_token)
#                 request.user = jwt_auth.get_user(validated_token)
#             except AuthenticationFailed:
#                 pass

#         return None