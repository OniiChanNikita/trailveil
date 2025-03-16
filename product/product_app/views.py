from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404


from .models import Product
from .serializers import ProductSerializer


# Create your views here.

class ProductsView(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		return Response(ProductSerializer(Product.objects.all(), many=True).data)

class ProductView(APIView):	
	permission_classes = [AllowAny]

	def get(self, request, slug):
		product = get_object_or_404(Product, slug=slug)
		return Response(ProductSerializer(product, many=False).data)

class CategoryView(APIView):
	permission_classes = [AllowAny]

	def get(self, request, slug):
		category = get_object_or_404(Category, slug = slug)
		products_category = Product.objects.filter(category = category)
		return Response(ProductSerializer(products_category, many=True).data)