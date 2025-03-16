import sys
import os
import django
import time

# Настройка пути и окружения
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "review.settings")

# Инициализация Django
django.setup()

# Импорты после настройки Django
from review_app.models import Review
import pika
from pika.exceptions import AMQPConnectionError
import json

def process_review(ch, method, properties, body):
    review_data = json.loads(body)
    print(f"Processing review: {review_data}")

    # Сохранение отзыва в базе данных
    Review.objects.create(**review_data)
    print("Review saved to database")

# Указываем параметры подключения
while True:
    try:
        credentials = pika.PlainCredentials('guest', 'guest')
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            host='rabbitmq', port=5672, credentials=credentials
        ))
        break
    except AMQPConnectionError:
        print("Waiting for RabbitMQ to be ready...")
        time.sleep(2) #5
channel = connection.channel()
channel.queue_declare(queue='reviews')

print("Connected to RabbitMQ!")

channel.basic_consume(queue='reviews', on_message_callback=process_review, auto_ack=True)
print("Worker is waiting for messages...")
channel.start_consuming()
