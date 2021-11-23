import React, { useState, useEffect } from "react";
import "./ChatHeader.css";
import { useUserContext } from "../../../Contexts/UserContext";
import { socketInit } from "../../../../utils/socketConnection";

import ChatHeaderOnline from "./ChatHeaderOnline";
import ChatHeaderSignIn from "./ChatHeaderSignIn";

const ChatHeader = ({ onlineUsers, setOnlineUsers }) => {
  const { user, setUser } = useUserContext();
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (payload) {
      setUser((prev) => {
        return {
          ...prev,
          username: payload.username,
          stayConnected: payload.stayConnected,
          socket: socketInit(payload.username),
        };
      });
    }
  }, [payload]);

  return (
    <>
      {user.username ? (
        <ChatHeaderOnline
          user={user}
          setUser={(user) => setUser(user)}
          setOnlineUsers={(users) => setOnlineUsers(users)}
        />
      ) : (
        <ChatHeaderSignIn setPayload={(payload) => setPayload(payload)} />
      )}
    </>
  );
};

export default ChatHeader;
