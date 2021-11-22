import React, { useState, useEffect } from "react";
import "./ChatHeader.css";
import { useUserContext } from "../../../Contexts/UserContext";
import { socketInit } from "../../../../utils/socketConnection";

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

  if (!user.username) {
    return (
      <div className="chat-title">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setPayload({
              username: e.target[0].value,
              stayConnected: e.target[1].checked,
            });
          }}
        >
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" />
          <label htmlFor="stayConnected">Stay Connected: </label>
          <input type="checkbox" name="stayConnected" />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-title chat-online">
      <div>
        <p>{user.accountType} Global Chat</p>
        <p>You are logged as {user.username}</p>
      </div>
      <button
        className="logout-btn"
        onClick={() => {
          user.socket.disconnect();
          setOnlineUsers([]);
          setUser((previousUser) => {
            return { ...previousUser, username: null };
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeader;
