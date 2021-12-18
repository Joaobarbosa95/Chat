import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatInput from "./ChatInput";

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
        <div className="message-receiver">
          <div className="individual-message-receiver">
            {" "}
            Olá chicquitoaweeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbb
            awerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrawer aweraw
          </div>
          <div className="message-time">13-10-2020</div>
        </div>
        <div className="message-sender">
          <div className="individual-message-sender">
            {" "}
            Olá chicquitoaweeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbb
            awerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrawer aweraw
          </div>
          <div className="message-time sender">13-10-2020</div>
        </div>
      </div>

      <ChatInput />
    </>
  );
};

export default Chat;
