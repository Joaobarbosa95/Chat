import React, { useState, useEffect } from "react";

// Components
import ChatHeader from "./ChatHeader/ChatHeader";
import Message from "./Message/Message";
import Chat from "./Chat/Chat";

// Contexts
import { useUserContext } from "../../Contexts/UserContext";

// Style
import "./GlobalChat.css";

const GlobalChat = ({ onlineUsers, setOnlineUsers }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    user.socket && newMessage && user.socket.emit("new-message", newMessage);
    newMessage &&
      setMessages((previousMessages) => [...previousMessages, newMessage]);
  }, [newMessage]);

  // Add the event on username change
  // This only happens one time
  // Solves the multiple events firing problem
  useEffect(() => {
    user.socket &&
      user.socket.on("update-messages", (message) => {
        setMessages((previousMessages) => [...previousMessages, message]);
      });
  }, [user.username]);

  return (
    <div className="chat-container">
      <ChatHeader
        onlineUsers={onlineUsers}
        setOnlineUsers={(users) => setOnlineUsers(users)}
      />
      <div className="chat-messages-container">
        <div className="chat-messages">
          {messages.length
            ? messages.map((message) => (
                <Message
                  username={user.username}
                  author={message.username}
                  text={message.text}
                  time={message.time}
                  key={message.id}
                />
              ))
            : ""}
        </div>
      </div>
      <Chat
        updateChat={(newMessage) => setNewMessage(newMessage)}
        username={user.username}
      />
    </div>
  );
};

export default GlobalChat;
