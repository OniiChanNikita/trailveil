from sqlalchemy.ext.asyncio import AsyncSession
from models import Message

async def save_message(db: AsyncSession, sender: str, chat_id: int, content: str):
    message = Message(sender=sender, chat_id=chat_id, content=content)
    db.add(message)
    await db.commit()
    await db.refresh(message)
