import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatInput from "./ChatInput";
import Message from "./Message";

import "./chat.css";
const Chat = () => {
  const user = { avatar: null };

  return (
    <>
      <div className="chat-user">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="avatar" />
        ) : (
          <FaUserCircle className="avatar" />
        )}
        <div className="user-info">
          <div className="chat-username">username</div>
          <div className="options">options</div>
          <div className="chat-status">Online</div>
        </div>
      </div>
      <div className="messages-box">
        <Message fromWho="receiver" />
        <Message fromWho="sender" />
        <Message fromWho="receiver" />
      </div>
      <ChatInput />
    </>
  );
};

export default Chat;
