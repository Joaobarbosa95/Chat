import React, { useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useUserContext } from "../../Contexts/UserContext";

import "./chat.css";
const Chat = ({ dialogue, publicId }) => {
  const { user } = useUserContext();
  const { userOne, userTwo, messages, _id } = dialogue;

  const otherUser = user.username === userOne ? userTwo : userOne;

  const messagesBottom = useRef(null);

  const scrollToBottom = () => {
    messagesBottom.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          <div className="chat-status">
            {dialogue?.status ? "online" : "offline"}
          </div>
        </div>
      </div>
      <div className="messages-box">
        {messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
        <div ref={messagesBottom} style={{ width: "100%" }} />
      </div>
      <ChatInput
        dialogue={dialogue}
        otherUser={otherUser}
        dialogueId={_id}
        publicId={publicId}
      />
    </>
  );
};

export default Chat;
