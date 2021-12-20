import React from "react";
import "./message.css";

const Message = ({ fromWho }) => {
  return (
    <div className={`message-${fromWho}`}>
      <div className={`individual-message-${fromWho}`}>
        Olá chicquitoaweeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbb
        awerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrawer aweraw
      </div>
      <div className={`message-time ${fromWho}`}>13-10-2020</div>
    </div>
  );
};

export default Message;
