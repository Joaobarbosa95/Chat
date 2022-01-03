import React from "react";
import "./message.css";
import { useUserContext } from "../../Contexts/UserContext";
import date from "date-and-time";

const Message = ({ message }) => {
  const { user } = useUserContext();

  const fromWho = user.username === message.sender ? "sender" : "receiver";
  let formatedDate = new Date(message.timestamp);
  let now = new Date().getTime();

  if (now - formatedDate.getTime() < 86400000) {
    formatedDate = date.format(formatedDate, "hh:mm");
  } else if (now - formatedDate.getTime() < 31557600000) {
    formatedDate = date.format(formatedDate, "DD/MM");
  } else {
    formatedDate = date.format(formatedDate, "DD/MM/YYYY");
  }
  return (
    <div className={`message-${fromWho}`}>
      <div className={`individual-message-${fromWho}`}>{message.text}</div>
      <div className={`message-time ${fromWho}`}>{formatedDate}</div>
    </div>
  );
};

export default Message;
