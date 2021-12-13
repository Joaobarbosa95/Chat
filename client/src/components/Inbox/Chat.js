import React from "react";
import ChatForm from "../Users/GlobalChat/Chat/Chat";

const Chat = () => {
  return (
    <>
      <div className="user">
        <img src="" alt="avatar" />
        <p className="chat-username">name</p>
        <p className="chat-status">online 3H ago</p>
      </div>
      <div className="messages-box">
        <div className="message">
          <div className="individual-message-text"></div>
          <div className="message-time"></div>
        </div>
      </div>
      <ChatForm />
    </>
  );
};

export default Chat;
