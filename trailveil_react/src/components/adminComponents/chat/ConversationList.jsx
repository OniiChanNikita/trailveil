import React from 'react';

const ConversationList = ({ conversations, currentChat, onSelect }) => {
  return (
    <div className="overflow-y-auto h-[calc(100vh-200px)]">
      {conversations.map(conv => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv)}
          className={`p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ${
            currentChat?.id === conv.id ? 'bg-blue-100 dark:bg-blue-900' : ''
          }`}
        >
          <div className="font-medium">{conv.user1=="support"? conv.user2 : conv.user1}</div>
          {/*<div className="text-sm text-gray-500 truncate">
            {conv.last_message?.text || 'Нет сообщений'}
          </div>*/}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;