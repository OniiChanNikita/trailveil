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
		return Response(ProductSerializer(Product.objects.filter(is_deleted=False), many=True).data)

	def post(self, request):
		return Response(ProductSerializer(Product.objects.filter(is_deleted=False, title=request.data['search'], availability=request.data["availability"], category__contains=request.data["category"]), many=True).data)


class ProductsCreate(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		serializer = ProductSerializer(data=request.data, many=False)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = 400)



class ProductView(APIView):	
	permission_classes = [AllowAny]

	def get(self, request, slug):
		product = get_object_or_404(Product, slug=slug)
		return Response(ProductSerializer(product, many=False).data)

	def put(self, request, slug):
		product = get_object_or_404(Product, slug=slug)
		serializer = ProductSerializer(product, data=request.data, many=False)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)

		return Response(serializer.errors, status = 400)

	def delete(self, request, slug):
		product = get_object_or_404(Product, slug=slug)
		product.is_deleted = True
		product.save()
		return Response(status=204)



class CategoryView(APIView):
	permission_classes = [AllowAny]

	def get(self, request, slug):
		category = get_object_or_404(Category, slug = slug)
		products_category = Product.objects.filter(category = category)
		return Response(ProductSerializer(products_category, many=True).data)