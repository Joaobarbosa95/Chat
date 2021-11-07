import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target[0]);
        }}
      >
        <textarea className="chat-input" placeholder="Insert text"></textarea>

        <div className="chat-send">
          <button type="submit" className="chat-send-btn">
            <FaTelegramPlane style={{ fontSize: "2em" }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
