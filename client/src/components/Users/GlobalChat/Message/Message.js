import React from "react";
import "./Message.css";

const Message = ({ username, author, text, time }) => {
  console.log(username, author);

  return (
    <>
      <div className="message-container">
        <div style={username === author ? { float: "right" } : {}}>
          <div className="message-text">{text}</div>
          <div className="message-date">{time}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
