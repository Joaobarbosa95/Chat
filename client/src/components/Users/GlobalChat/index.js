import React, { useState } from "react";

// Components
import ChatHeader from "./ChatHeader/ChatHeader";
import Message from "./Message/Message";
import Chat from "./Chat/Chat";

// Style
import "./GlobalChat.css";

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <Message text={message.text} time={message.time} key={message.id} />
          ))}
        </div>
      </div>
      <Chat
        updateChat={(newMessage) => setMessages([...messages, newMessage])}
      />
    </div>
  );
};

export default GlobalChat;
