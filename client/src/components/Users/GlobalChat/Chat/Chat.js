import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./Chat.css";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ updateChat }) => {
  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          updateChat({
            user: "Anon",
            text: e.target[0].value,
            time: new Date().getMilliseconds(),
            id: uuidv4(),
          });
          e.target[0].value = "";
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
