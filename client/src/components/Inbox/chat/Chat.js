import React, { useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatInput from "./ChatInput";
import { useUserContext } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";
import MessagesBox from "./MessagesBox";
import "./chat.css";

const Chat = () => {
  const { user } = useUserContext();

  const { publicProfile } = useChatContext();

  const otherUser = "EU";

  return (
    <>
      <div className="chat-user">
        {undefined ? (
          <img src={user.avatar} alt="avatar" className="avatar" />
        ) : (
          <FaUserCircle className="avatar" />
        )}
        <div className="user-info">
          <div className="chat-username">{otherUser}</div>
          <div className="options">options</div>
          <div className="chat-status">{true ? "online" : "offline"}</div>
        </div>
      </div>
      <MessagesBox />
      <ChatInput />
    </>
  );
};

export default Chat;
