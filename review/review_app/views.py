from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .authentication import CustomJWTAuthentication
from rest_framework import status

from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.tokens import AccessToken


import pika
import json

# Create your views here.

class ReviewsView(APIView):
	permission_classes = [AllowAny]
	authentication_classes = []

	def get(self, request):
		reviews = Review.objects.all()
		return Response(ReviewSerializer(Review, many=True).data)


class ReviewCreateView(APIView):
	permission_classes = [AllowAny]
	authentication_classes = [CustomJWTAuthentication]

	def post(self, request):
		token = request.headers.get('Authorization', '').split(' ')[-1]  # Получаем токен из заголовка
		decoded_token = AccessToken(token)  # Декодируем токен
		user_id = decoded_token['user_id']  # Извлекаем id пользователя

		data = request.data
		print(data, user_id)

		# need user_id, title and product_id

		if 'title' not in data:
			return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

		data.update({'user_id': user_id})

		try:
			self.publish_to_queue(data)
		except Exception as e:
			return Response({"error": f"Failed to publish to queue: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return Response({"message": "Review submitted successfully"}, status=status.HTTP_201_CREATED)

	@staticmethod
	def publish_to_queue(review_data):
		credentials = pika.PlainCredentials('guest', 'guest')
		connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq', port=5672, credentials=credentials))
		channel = connection.channel()
		channel.queue_declare(queue='reviews')

		channel.basic_publish(
			exchange='',
			routing_key='reviews',
			body=json.dumps(review_data)
		)
		connection.close()


