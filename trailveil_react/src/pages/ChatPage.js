import { useState, useEffect, useRef } from "react";
import { FaRobot, FaHeadset, FaLightbulb, FaBars, FaTimes } from "react-icons/fa";
import axiosInstance from '../axiosInstance';
import "./ChatPage.css";


const ChatPage = () => {

  const [activeChat, setActiveChat] = useState("support");
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const ws = useRef(null);


  useEffect(async () => {
    try{
      const response_chat = await axiosInstance.get(`http://chat_http.localhost:80/messages/users/${localStorage.getItem('username')}/${activeChat}/`)
      const response_messages = await axiosInstance.get(`http://chat_http.localhost:80/messages/chat/${response_chat.data.id}/`)
      setMessages(response_messages.data)
    } catch(err) {
      console.log(err)

    }
  }, [])

  useEffect(() => {
    console.log(activeChat)

    ws.current = new WebSocket(`ws://localhost:8081/ws/${activeChat}?token=${localStorage.getItem("accessToken")}`);


    ws.current.onopen = () => console.log('connected')
    ws.current.onerror = (err) => console.log(err)
    ws.current.onclose = (e) => console.log("WebSocket closed:", e.code, e.reason);
    ws.current.onmessage = (event) => {
      console.log(event)
      const newMessage = JSON.parse(event.data);
      console.log(newMessage)
      console.log("New message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => {
      ws.current.close();
    };
  }, [activeChat]);

  const sendMessage = () => {
    if (inputMessage.trim() && ws.current) {
      const messageData = { sender: localStorage.getItem("username"), text: inputMessage };
      console.log(messageData)

      ws.current.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, { sender: localStorage.getItem("username"), content: inputMessage }]);
      console.log(messages)
      setInputMessage("");
    }
  };

  const chats = [
    { id: "assistant", name: "Умный чат-помощник", icon: <FaRobot /> },
    { id: "support", name: "Чат с поддержкой", icon: <FaHeadset /> },
    { id: "ideas", name: "Чат с идеями", icon: <FaLightbulb /> },
  ];

  return (
    <div className="chat-container">
      <div className="fog-overlay"></div>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>Чаты</h2>
        <div className="chat-list">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`chat-btn ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => {
                setActiveChat(chat.id);
                setMenuOpen(false);
              }}
            >
              {chat.icon} {chat.name}
            </button>
          ))}
        </div>
      </aside>

      <main className="chat-area">
        {activeChat ? (
          <div className="chat-window">
            <h3>{chats.find((c) => c.id === activeChat).name}</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === localStorage.getItem('username') ? "sent" : "received"}`}>
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
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        ) : (
          <p className="welcome-text">Выберите чат</p>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
