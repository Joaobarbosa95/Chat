import React from "react";

import ChatTitle from "./ChatTitle/ChatTitle";
import Message from "./Message/Message";
import Chat from "./Chat/Chat";

const mockMessage = [
  { author: "Johnny", text: "Hello! How are you?", time: "milliseconds" },
  {
    author: "Edu",
    text: "Fine. How you been doing mate?",
    time: "milliseconds",
  },
  {
    author: "Jonnhy bravo",
    text: "Hey pals.\nWanna do something tonight?",
    time: "milimili",
  },
  { author: "Johnny", text: "Hello! How are you?", time: "milliseconds" },
  {
    author: "Edu",
    text: "Fine. How you been doing mate?",
    time: "milliseconds",
  },
  {
    author: "Jonnhy bravo",
    text: "Hey pals.\nWanna do something tonight?",
    time: "milimili",
  },
  { author: "Johnny", text: "Hello! How are you?", time: "milliseconds" },
  {
    author: "Edu",
    text: "Fine. How you been doing mate?",
    time: "milliseconds",
  },
  {
    author: "Jonnhy bravo",
    text: "Hey pals.\nWanna do something tonight?",
    time: "milimili",
  },
  { author: "Johnny", text: "Hello! How are you?", time: "milliseconds" },
  {
    author: "Edu",
    text: "Fine. How you been doing mate?",
    time: "milliseconds",
  },
  {
    author: "Jonnhy bravo",
    text: "Hey pals.\nWanna do something tonight?",
    time: "milimili",
  },
];

const GlobalChat = (props) => {
  return (
    <div className="chat-container">
      <ChatTitle />
      <div className="chat-messages-container">
        <div className="chat-messages">
          {mockMessage.map((message) => (
            <Message
              text={message.text}
              author={message.author}
              time={message.time}
              key={message.time}
            />
          ))}
        </div>
      </div>
      <Chat />
    </div>
  );
};

GlobalChat.propTypes = {};

export default GlobalChat;
