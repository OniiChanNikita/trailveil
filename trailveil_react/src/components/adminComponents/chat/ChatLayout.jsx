import React, { useState, useEffect, useRef } from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserSearch from './UserSearch';

const ChatLayout = () => {
  const { isSupport, isLoading } = usePermissions();
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const ws = useRef(null);

  // Инициализация WebSocket
  useEffect(() => {
    console.log(currentChat)
    if (!isSupport || isLoading) return;
    
    if (currentChat.user1 == "support") {
      ws.current = new WebSocket(`ws://localhost:8081/ws/${currentChat.user2}?token=${localStorage.getItem('accessToken')}`);
    } else{
      ws.current = new WebSocket(`ws://localhost:8081/ws/${currentChat.user1}?token=${localStorage.getItem('accessToken')}`);
    }
    
    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      setMessages(prev => [...prev, data]);
    };

    return () => {
      ws.current.close();
    };
  }, [currentChat]);

  // Загрузка списка диалогов
  useEffect(() => {
    if (!isSupport || isLoading) return;

    const fetchConversations = async () => {
      try {
        const response = await fetch('http://chat_http.localhost/messages/staff');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchConversations();
  }, [isLoading]);

  // Загрузка сообщений при смене чата
  useEffect(() => {
    if (!currentChat || !isSupport) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://chat_http.localhost/messages/chat/${currentChat.id}`);
        const data = await response.json();
        console.log(data)
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMessage = (text) => {
    if (ws.current?.readyState === WebSocket.OPEN && currentChat) {
      const message = {
        text,
        chat_id: currentChat.id,
        sender: 'support'
      };
      console.log(message)
      ws.current.send(JSON.stringify(message));
      setMessages(prev => [...prev, {content: text, chat_id: currentChat.id, sender: "support"}]);
    }
  };

  if (isLoading) return <div className="p-4">Проверка прав доступа...</div>;
  if (!isSupport) return <div className="p-4">Доступ только для поддержки</div>;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-800">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <UserSearch onSelect={setCurrentChat} />
        <ConversationList 
          conversations={conversations} 
          currentChat={currentChat}
          onSelect={setCurrentChat}
        />
      </div>
      <div className="flex flex-col w-2/3">
        {currentChat ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium">
                Чат с {currentChat.username || `ID: ${currentChat.user_id}`}
              </h3>
            </div>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Выберите чат</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;