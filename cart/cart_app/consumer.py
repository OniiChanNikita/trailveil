import pika
import json 
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cart.settings')
django.setup()

from .models import Cart

def consume_messages():
	connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
	channel = connection.channel()
	channel.queue_declare(queue='user_profile')

	def callback(ch, method, properties, body):
		data = json.loads(body)
		Cart.objects.create(profile_id = data['profile_id'], item = data['item'])

	channel.basic_consume(queue='user_profile', on_message_callback=callback, auto_ack=True)
	print('waiting for messages')
	channel.start_consuming()