from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware


from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import Message
from models import Chat
from database import get_db, engine
from models import Base
from crud import save_message
import redis.asyncio as redis
import httpx
import json
import asyncio
import datetime



import os

app = FastAPI()

origins = [
    "http://frontend.localhost:3000",  # Если фронтенд на React
    "http://frontend.localhost:8000",  # Если ты тестируешь API локально
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Кто может отправлять запросы
    allow_credentials=True,  # Разрешить куки и авторизацию
    allow_methods=["*"],  # Разрешенные методы (GET, POST, WS и т.д.)
    allow_headers=["*"],  # Разрешенные заголовки (Authorization, WebSocket и т.д.)
)

redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=int(os.getenv("REDIS_PORT", 6379)), decode_responses=True)
client = httpx.AsyncClient()

@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def verify_token(token: str):
    response_auth = await client.post("http://auth:8000/valid/", json={"token": token})
    if response_auth.status_code == 200:
        response_user = await client.get(f"http://users:8000/users/{response_auth.json()["payload"]["username"]}/")
        if response_user.status_code != 200:
            return None
        return response_user.json()
    return None

async def get_or_create_chat(db: AsyncSession, user1: str, user2: str):
    result = await db.execute(
        select(Chat).where(
            ((Chat.user1 == user1) & (Chat.user2 == user2)) |
            ((Chat.user1 == user2) & (Chat.user2 == user1))
        )
    )
    chat = result.scalars().first()

    if not chat:
        chat = Chat(user1=user1, user2=user2)
        db.add(chat)
        await db.commit()
        await db.refresh(chat)

    return chat

@app.websocket("/ws/{recipient}")
async def websocket_endpoint(
    websocket: WebSocket, 
    recipient: str, 
    token: str, 
    db: AsyncSession = Depends(get_db)
):
    await websocket.accept()
    
    if not token:
        await websocket.close(code=4001)
        return

    listener_task = None

    try:
        user_data = await verify_token(token)
        if not user_data:
            await websocket.close(code=1008)
            return

        sender = user_data["username"]
        is_staff = user_data.get('is_staff', False)
        if is_staff:
            sender = "support"

        chat = await get_or_create_chat(db, sender, recipient)
        print(f"Chat established: {chat.id} between {sender} and {recipient}")

        pubsub = redis_client.pubsub()
        await pubsub.subscribe(f"chat:{chat.id}:{sender}")
        print(f"Subscribed to Redis channel: chat:{chat.id}:{sender}")

        active = True

        async def listen_redis():
            try:
                async for message in pubsub.listen():
                    if not active:
                        break
                    if message['type'] == 'message':
                        try:
                            data = json.loads(message["data"])
                            print(f"Received from Redis: {data}")
                            await websocket.send_text(json.dumps(data))
                        except Exception as e:
                            print(f"Error processing Redis message: {e}")
            except Exception as e:
                print(f"Redis listener error: {e}")
            finally:
                print("Redis listener stopped")

        listener_task = asyncio.create_task(listen_redis())

        while active:
            try:
                data = await websocket.receive_text()
                print(f"Received from client: {data}")
                
                received_data = json.loads(data)
                text = received_data.get("text")
                
                if not text:
                    continue

                await save_message(db, sender, chat.id, text)
                print(f"Message saved to DB: {text[:50]}...")

                message = {
                    "sender": sender,
                    "content": text,
                    "chat_id": chat.id,
                    "timestamp": datetime.utcnow().isoformat()
                }
                await redis_client.publish(
                    f"chat:{chat.id}:{recipient}",
                    json.dumps(message)
                )
                print(f"Published to Redis: {message}")

            except WebSocketDisconnect:
                print("Client disconnected")
                active = False
                break
                
            except json.JSONDecodeError:
                print("Invalid JSON received")
                await websocket.send_text(json.dumps({
                    "error": "Invalid message format"
                }))
                
            except Exception as e:
                print(f"Unexpected error: {e}")
                active = False
                break

    except Exception as e:
        print(f"Connection error: {e}")
        
    finally:
        print("Closing connection...")
        active = False
        if listener_task:
            listener_task.cancel()
        try:
            await pubsub.unsubscribe(f"chat:{chat.id}:{sender}")
            await pubsub.close()
        except:
            pass

@app.get("/messages/staff")
async def get_mesmanysages_staff(db: AsyncSession = Depends(get_db)):
    support_chat_db = await db.execute(
        select(Chat)
        .where(
            ((Chat.user1 == 'support')) |
            ((Chat.user2 == 'support'))
        )
    )
    s_chats = support_chat_db.scalars().all()

    return [
        {
            "id": chat.id,
            "user1": chat.user1,
            "user2": chat.user2,
        }
        for chat in s_chats
    ]


@app.get("/messages/chat/{chat_id}") #{sender}/{recipient}
async def get_messages(chat_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message)
        .where((Message.chat_id == chat_id))
        .order_by(Message.timestamp)

    )
    messages = result.scalars().all()


    if not messages:
        raise HTTPException(status_code=404, detail="Messages not found")

    return [
        {
            "id": message.id,
            "sender": message.sender,
            "content": message.content,
            "chat_id": message.chat_id,
            "timestamp": message.timestamp.isoformat(),
        }
        for message in messages
    ]

@app.get("/messages/users/{sender}/{recipient}/") #{sender}/{recipient}
async def get_messages(sender: str, recipient: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Chat).where(
            ((Chat.user1 == sender) & (Chat.user2 == recipient)) |
            ((Chat.user1 == recipient) & (Chat.user2 == sender))
        )
    )
    chat = result.scalars().first()


    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    return {
        "id": chat.id,
        "user1": chat.user1,
        "user2": chat.user2,
    }



@app.post('/messages/create_chat')
async def create_chat(db: AsyncSession = Depends(get_db)):
    chat = Chat(user1=user1, user2=user2)
    db.add(chat)
    await db.commit()
    await db.refresh(chat)

    return chat