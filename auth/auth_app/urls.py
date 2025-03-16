from django.urls import path
from .views import RegisterView, LoginView, ValidToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.conf import settings

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('valid/', ValidToken.as_view(), name='validate_token'),
]
