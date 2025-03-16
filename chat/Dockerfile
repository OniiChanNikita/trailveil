# Базовый образ с Python
FROM python:3.12

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Открываем порт для WebSocket
EXPOSE 8000

# Запускаем приложение через Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
