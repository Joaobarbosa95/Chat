import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./chatInput.css";

export const ChatInput = () => {
  const [message, setMessage] = useState(null);

  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="chat-input"
          placeholder="Insert text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
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

export default ChatInput;
