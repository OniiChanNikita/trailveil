"""
URL configuration for users project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from users_app.views import RegisterUserView, GetUserView, GetUsersView, ValidateLoginView, StaffUsersView, StaffMeView
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/register/', RegisterUserView.as_view(), name='user-register'),  # Получить список пользователей
    path('users/', GetUsersView.as_view(), name='user-list'),  # Получить список пользователей
    path('users/<str:username>/', GetUserView.as_view(), name='user-detail'),  # Получить пользователя по ID
    path('user/validate/', ValidateLoginView.as_view(), name='user-validate'),  # Получить пользователя по ID

    path('api/staff/me', StaffMeView.as_view(), name='staff-me'),
    path('api/staff/users', StaffUsersView.as_view(), name='staff-users')
]
