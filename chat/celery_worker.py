from celery import Celery
import json

celery = Celery("tasks", broker="redis://localhost:6379")

@celery.task
def log_message(message):
    """Логируем сообщение в файл"""
    with open("chat_logs.txt", "a") as f:
        f.write(json.dumps(message) + "\n")
