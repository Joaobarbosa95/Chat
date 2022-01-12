import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./chatInput.css";
import { useUserContext } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";

export const ChatInput = () => {
  const { user } = useUserContext();
  const { publicId, username, activeDialogue } = useChatContext();
  const { socket } = user;
  const [messageText, setMessageText] = useState("");

  // hook to query the conversation id

  function handleSubmit() {
    // No input
    if (messageText.trim().length === 0) return;

    const message = {
      sender: user.username,
      receiver: username,
      text: messageText.trim(),
      timestamp: new Date(),
    };

    console.log(activeDialogue);
    // emit event
    socket.emit("private message", {
      message,
      activeDialogue,
      username,
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
