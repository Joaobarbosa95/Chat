import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./Chat.css";
import { v4 as uuidv4 } from "uuid";

const textareaFocus = (e) => {
  e.target.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector(".chat-send-btn").click();
    }
  });
};

const Chat = ({ updateChat, username }) => {
  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target[0].value;

          if (message.trim().length < 1) return;

          updateChat({
            username: username,
            text: message,
            time: new Date().getTime(),
            id: uuidv4(),
          });

          e.target[0].value = "";
        }}
      >
        <textarea
          className="chat-input"
          placeholder="Insert text"
          onFocus={textareaFocus}
          onBlur={(e) => {
            e.target.removeEventListener("keydown", textareaFocus);
          }}
        ></textarea>

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
