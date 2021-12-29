import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./chatInput.css";
import { useUserContext } from "../../Contexts/UserContext";

export const ChatInput = ({ dialogueId, dialogue, otherUser, publicId }) => {
  const { user } = useUserContext();
  const { socket } = user;
  const [messageText, setMessageText] = useState("");

  function handleSubmit() {
    // No input
    if (messageText.trim().length === 0) return;

    const message = {
      sender: user.username,
      text: messageText.trim(),
      timestamp: new Date(),
      seen: false,
    };

    // emit event
    socket.emit("private message", {
      message,
      dialogueId,
      otherUser,
      publicId,
    });

    // Clean input
    setMessageText("");
  }

  return (
    <div className="chat-input-form">
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          className="chat-input"
          placeholder="Insert text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              handleSubmit();
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
