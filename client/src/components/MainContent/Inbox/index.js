import React, { useEffect } from "react";
import "./inbox.css";
import { useUserContext } from "../../../Contexts/UserContext";
import { useChatContext } from "../../../Contexts/ChatContext";

import Dialogues from "./Dialogues/Dialogues";
import Chat from "./Chat/Chat";
import AboutUser from "./AboutUser/AboutUser";

const Index = () => {
  const { userState } = useUserContext();
  const { setOnlineUsers } = useChatContext();
  const { socket } = userState;

  useEffect(() => {
    if (!socket) return;

    socket.emit("users");

    socket.on("users", ({ users }) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("users");
    };
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
