import React, { useState, useEffect } from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserSearch from './UserSearch';

const ChatLayout = () => {
  const { role, isSupport, isAdmin, isLoading } = usePermissions();
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  // Инициализация WebSocket
/*  useEffect(() => {
    if (!isSupport || isLoading) return;
    
    const newSocket = new WebSocket(`ws://localhost:8081/ws/user1`);
    
    newSocket.onopen = () => {
      console.log('WebSocket connected');
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    return () => {
      newSocket?.close();
    };
  }, [isSupport, isLoading]);*/

  // Загрузка списка диалогов
  useEffect(() => {
    console.log(isAdmin, isLoading)
    if (!isSupport || !isAdmin || isLoading) return;

    const fetchConversations = async () => {
      try {
        const response = await fetch('http://chat_http.localhost/messages/staff');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchConversations();
  }, [isSupport, isLoading]);

  // Загрузка сообщений при смене чата
  useEffect(() => {
    if (!currentChat || !isSupport) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://chat_http.localhost/messages/chat/${currentChat.id}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    fetchMessages();
  }, [currentChat, isSupport]);

  const handleSendMessage = (text) => {
    if (socket?.readyState === WebSocket.OPEN && currentChat) {
      socket.send(JSON.stringify({
        text,
        chat_id: currentChat.id,
        recipient: currentChat.user_id
      }));
    }
  };

  if (isLoading) return <div>Проверка прав доступа...</div>;
  if (!isSupport) return <div>Доступ только для поддержки</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
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
                Чат с {currentChat.username}
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