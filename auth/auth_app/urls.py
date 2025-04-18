from django.urls import path
from .views import RegisterView, LoginView, VerifyTokenView, CookieTokenRefreshView, RefreshTokenView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.conf import settings

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('valid/', VerifyTokenView.as_view(), name='validate_token'),
    path('logout/', LogoutView.as_view(), name='validate_token'),
]
