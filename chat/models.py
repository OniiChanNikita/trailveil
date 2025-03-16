from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, index=True)
    user1 = Column(String, nullable=False)
    user2 = Column(String, nullable=False)

    messages = relationship('Message', back_populates='chat')

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, nullable=False)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=func.now())

    chat_id = Column(Integer, ForeignKey("chats.id"), nullable=False)
    chat = relationship("Chat", back_populates="messages")
    