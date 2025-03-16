"""
URL configuration for gateway project.

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
from django.urls import path
from gateway_api.views import Gateway

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('auth/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://auth:8000/{subpath}')),
    path('users/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://users:8000/{subpath}')),
    path('product/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://product:8000/{subpath}')),
    path('review/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://review:8000/{subpath}')),
    path('admin/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://admin:8000/{subpath}')),
    path('chat/<path:subpath>', lambda req, subpath: Gateway.forward(req, f'http://chat:8000/{subpath}')),
]
