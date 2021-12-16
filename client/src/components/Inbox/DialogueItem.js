import React from "react";
import { FaUserCircle } from "react-icons/fa";

const DialogueItem = ({ user }) => {
  let unseenMessages = 0;
  const length = user.messages.length - 1;

  // unseenMessages count
  for (let i = length; i > 0; i--) {
    if (user.messages[i].status === "unseen") unseenMessages++;
    break;
  }

  const lastMessageTime = new Date(user.messages[length].time).getHours();

  return (
    <div className="dialogue-item">
      {user.avatar ? (
        <img src={user.avatar} alt="avatar" className="avatar" />
      ) : (
        <FaUserCircle className="avatar" />
      )}
      <div className="dialogue-info">
        <div className="dialogue-name">{user.username}</div>
        <div className="last-message-time">{lastMessageTime}</div>
        <div className="dialogue-status">{user.status}</div>
      </div>
      <div className="dialogue-text">
        <div className="dialogue-last-message">
          {user.messages[length].text}
        </div>
        <div className="unseen-messages-count">{unseenMessages}</div>
      </div>
    </div>
  );
};

export default DialogueItem;
