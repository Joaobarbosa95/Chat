import React from "react";
import "./message.css";
import { useUserContext } from "../../Contexts/UserContext";

const Message = ({ message }) => {
  const { user } = useUserContext();

  const fromWho = user.username === message.sender ? "sender" : "receiver";

  return (
    <div className={`message-${fromWho}`}>
      <div className={`individual-message-${fromWho}`}>{message.text}</div>
      <div className={`message-time ${fromWho}`}>{message.timestamp}</div>
    </div>
  );
};

export default Message;
