import React, { useState, useEffect } from "react";
import "./inbox.css";
import { useUserContext } from "../Contexts/UserContext";
import { useChatContext } from "../Contexts/ChatContext";

import Dialogues from "./dialogues/Dialogues";
import Chat from "./chat/Chat";
import AboutUser from "./aboutUser/AboutUser";

const Index = () => {
  const { user } = useUserContext();
  const { setOnlineUsers } = useChatContext();
  const { socket } = user;

  useEffect(() => {
    if (!socket) return;

    socket.emit("users");

    socket.on("users", ({ users }) => {
      setOnlineUsers(users);
    });
  }, [socket]);

  return (
    <div className="inbox-container">
      <Dialogues />
      <Chat />
      <AboutUser />
    </div>
  );
};

export default Index;
