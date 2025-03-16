import { useState, useEffect, useRef } from "react";
import "../../../pages/ChatPage.css"; // Используем ваши стили
import axios from 'axios'

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const ws = useRef(null);

  // Загрузка сообщений при выборе пользователя
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://chat_http.localhost/messages/chat/${selectedUser.id}/`
          );
          setMessages(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  // WebSocket для обмена сообщениями
  useEffect(() => {
    if (selectedUser) {
      ws.current = new WebSocket(
        `ws://localhost:8081/ws/${selectedUser.user}?token=${localStorage.getItem("accessToken")}`
      );

      ws.current.onopen = () => console.log('connected');
      ws.current.onerror = (err) => console.log(err);
      ws.current.onclose = (e) => console.log("WebSocket closed:", e.code, e.reason);
      ws.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, newMessage]);
      };

      return () => {
        ws.current.close();
      };
    }
  }, [selectedUser]);

  // Отправка сообщения
  const sendMessage = () => {
    if (inputMessage.trim() && ws.current) {
      const messageData = {
        sender: "support", // Отправляем от имени администратора
        text: inputMessage,
        chat_id: selectedUser.id
      };

      ws.current.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, { sender: "support", content: inputMessage }]);
      setInputMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="fog-overlay"></div>
      <main className="chat-area">
        {selectedUser ? (
          <div className="chat-window">
            <h3>Чат с {selectedUser.user}</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "support" ? "sent" : "received"}`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Введите сообщение..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        ) : (
          <p className="welcome-text">Выберите пользователя</p>
        )}
      </main>
    </div>

  );
};

export default ChatWindow;