import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./Chat.css";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../../../../../Contexts/UserContext";

const Chat = () => {
  const { userState } = useUserContext();
  const [message, setMessage] = useState("");
  const { socket } = userState;

  function Submit() {
    if (message.trim().length < 1) return;
    const newMessage = {
      username: userState.username,
      text: message,
      time: new Date().getTime(),
      id: uuidv4(),
    };

    socket.emit("new message", newMessage);

    setMessage("");
  }

  return (
    <div className="chat-input-form">
      <form
        className="global-chat"
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
