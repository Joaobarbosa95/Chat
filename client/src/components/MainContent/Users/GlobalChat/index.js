import React, { useRef, useState, useEffect } from "react";

// Components
import ChatHeader from "./ChatHeader/ChatHeader";
import Message from "./Message/Message";
import Chat from "./Chat/Chat";

// Contexts
import { useUserContext } from "../../../../Contexts/UserContext";

// Hooks
import useAutoScroll from "../../../../services/hooks/useAutoScroll";

// Style
import "./GlobalChat.css";

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const { userState } = useUserContext();
  const { socket } = userState;

  const observerMessageBox = useRef();

  const { observerMessageBottom } = useAutoScroll(messages, observerMessageBox);

  useEffect(() => {
    if (!socket) return;
    socket.emit("user joined chat");

    socket.on("user joined chat", (newUserMessage) => {
      setMessages((prevMessages) => {
        return [...prevMessages, { type: "user connected", ...newUserMessage }];
      });
    });

    socket.on("user left chat", (userLeftMessage) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          { type: "user disconnected", ...userLeftMessage },
        ];
      });
    });

    socket.on("new message", (newMessage) => {
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
        <div className="chat-messages" ref={observerMessageBox}>
          {messages.map((message, index) => {
            return <Message key={message.id} message={message} />;
          })}
          <div style={{ width: "100%" }} ref={observerMessageBottom}></div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default GlobalChat;
