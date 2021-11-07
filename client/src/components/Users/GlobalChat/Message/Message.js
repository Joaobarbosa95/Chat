import React from "react";
import "./Message.css";

const Message = ({ author, text, time }) => {
  return (
    <div className="message-container">
      <div className="message-text">{text}</div>
      <div className="message-date">{time}</div>
    </div>
  );
};

export default Message;
