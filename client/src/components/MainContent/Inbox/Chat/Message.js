import React from "react";
import "./message.css";
import { useUserContext } from "../../../../Contexts/UserContext";
import formatTimestamp from "../../../../utils/formatTimestamp";

const Message = ({ message, reference }) => {
  const { user } = useUserContext();

  const fromWho = user.username === message.sender ? "sender" : "receiver";

  let formatedTimestamp = formatTimestamp(message.timestamp);

  return (
    <div className={`message-${fromWho}`} ref={reference}>
      <div className={`individual-message-${fromWho}`}>{message.text}</div>
      <div className={`message-time ${fromWho}`}>{formatedTimestamp}</div>
    </div>
  );
};

export default Message;
