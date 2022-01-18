import React, { useState, useEffect } from "react";

// Components
import ChatHeader from "./ChatHeader/ChatHeader";
import Message from "./Message/Message";
import Chat from "./Chat/Chat";

// Contexts
import { useUserContext } from "../../Contexts/UserContext";

// Style
import "./GlobalChat.css";

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useUserContext();
  const { socket } = user;

  useEffect(() => {
    if (!socket) return;
    socket.emit("user joined chat");

    socket.on("user joined chat", (newUserMessage) => {
      setMessages((prevMessages) => {
        return [...prevMessages, { type: "user connected", ...newUserMessage }];
      });
    });

    socket.on("user left chat", ({ userLeftMessage }) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { type: "user disconnect", ...userLeftMessage },
        ];
      });
    });

    socket.on("new message", ({ newMessage }) => {
      console.log(newMessage);
      setMessages((prevMessages) => {
        return [...prevMessages, { type: "message", ...newMessage }];
      });
    });

    return () => {
      socket.off("new message");
      socket.off("user joined chat");
      socket.off("user left chat");
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default GlobalChat;
