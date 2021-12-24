import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useUserContext } from "../../Contexts/UserContext";

import "./chat.css";
const Chat = ({ activeDialogue }) => {
  const { user } = useUserContext();
  const { messages } = activeDialogue;

  console.log(activeDialogue);
  return (
    <>
      <div className="chat-user">
        {undefined ? (
          <img src={user.avatar} alt="avatar" className="avatar" />
        ) : (
          <FaUserCircle className="avatar" />
        )}
        <div className="user-info">
          <div className="chat-username">
            {user.username === activeDialogue.userOne
              ? activeDialogue.userTwo
              : activeDialogue.userOne}
          </div>
          <div className="options">options</div>
          <div className="chat-status">Online</div>
        </div>
      </div>
      <div className="messages-box">
        {messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
      </div>
      <ChatInput />
    </>
  );
};

export default Chat;
