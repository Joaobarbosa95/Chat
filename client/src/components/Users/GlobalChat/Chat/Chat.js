import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./Chat.css";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ updateChat, username }) => {
  const [message, setMessage] = useState("");

  function Submit() {
    if (message.trim().length < 1) return;

    updateChat({
      username: username,
      text: message,
      time: new Date().getTime(),
      id: uuidv4(),
    });

    setMessage("");
  }

  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          Submit();
        }}
      >
        <textarea
          className="chat-input"
          placeholder="Insert text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            // Don't know if needs it
            if (e.code === "Enter") {
              e.preventDefault();
              Submit();
            }
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
