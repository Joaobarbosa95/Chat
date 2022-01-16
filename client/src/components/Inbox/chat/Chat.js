import React from "react";
import { FaUserCircle } from "react-icons/fa";

// Contexts
import { useChatContext } from "../../Contexts/ChatContext";

// Components
import MessagesBox from "./MessagesBox";
import ChatInput from "./ChatInput";

// CSS
import "./chat.css";

const Chat = () => {
  const { username } = useChatContext();

  return (
    <div className="direct-messages-container">
      <div className="chat-user">
        {undefined ? (
          <img src={username.avatar} alt="avatar" className="avatar" />
        ) : (
          <FaUserCircle className="avatar" />
        )}
        <div className="user-info">
          <div className="chat-username">{username}</div>
          <div className="options">options</div>
          <div className="chat-status">{true ? "online" : "offline"}</div>
        </div>
      </div>
      <MessagesBox />
      <ChatInput />
    </div>
  );
};

export default Chat;
