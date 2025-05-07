
from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
	path('products/', ProductsView.as_view()),
	path('products/create', ProductsCreate.as_view()),
	path('products/<slug:slug>', ProductView.as_view()),
	path('category/<slug:slug>', CategoryView.as_view())
]


