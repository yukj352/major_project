import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);

  const sendMessage = async (msg) => {
    const messageToSend = msg || input;

    if (!messageToSend) return;

    // 👤 User message
    const userMessage = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        text: messageToSend,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);

      // 🎯 Show options
      setOptions(res.data.options || []);

    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to AI" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">

      {/* 🛡️ HEADER */}
      <div className="chat-header">
        🛡️ SafeGuard AI
      </div>

      {/* 💬 CHATBOX */}
      <div className="chatbox">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "user" : "bot"}
            style={
              msg.text.includes("🚨")
                ? { border: "1px solid red", boxShadow: "0 0 8px red" }
                : {}
            }
          >
            {msg.text}
          </div>
        ))}

        {/* 🎯 OPTIONS */}
        <div className="options-container">
          {options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${
                opt.toLowerCase().includes("help") ? "emergency" : "normal"
              }`}
              onClick={() => {
                setOptions([]);
                sendMessage(opt);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ⌨️ INPUT */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your situation..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;