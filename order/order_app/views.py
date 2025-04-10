from django.shortcuts import render
from .models import Order
from .serializers import OrderSerializer

# Create your views here.

class OrderUser(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		return Response(OrderSerializer(Order.objects.fitler(user_id=request.data.get("user_id")), many=True).data)

class Order(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		return Response(OrderSerializer(Order.objects.all()).data)

	def post(self, request):
		return Response(OrderSerializer(Order.objects.get(id=request.data.get('order_id')))