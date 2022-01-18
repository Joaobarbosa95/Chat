import React from "react";
import "./Message.css";
import formatTimestamp from "../../../../utils/formatTimestamp";

const Message = ({ username, text, time }) => {
  // if not time or text the user joined or left the room
  return (
    <>
      <div className="message-container">
        <div>
          <div>{username}</div>
          <div className="message-text">{text}</div>
          <div className="message-date">{formatTimestamp(time)}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
