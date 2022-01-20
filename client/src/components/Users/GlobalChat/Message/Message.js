import React from "react";
import "./Message.css";
import TextMessage from "./TextMessage";
import UserConnected from "./UserConnected";
import UserDisconnected from "./UserDisconnected";

const Message = ({ message }) => {
  const { type, username, text, time } = message;
  switch (type) {
    case "user connected":
      return <UserConnected username={username} />;
    case "user disconnected":
      return <UserDisconnected username={username} />;
    case "message":
      return <TextMessage username={username} text={text} time={time} />;
    default:
      return <> </>;
  }
};

export default Message;
