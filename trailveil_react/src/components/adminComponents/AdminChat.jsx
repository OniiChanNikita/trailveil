import { useEffect, useState } from "react";
import { socket } from "../../lib/socket";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("new_message", (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off("new_message");
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("send_message", { text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl mb-4">Чат админов</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 border p-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Сообщение..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default AdminChat
