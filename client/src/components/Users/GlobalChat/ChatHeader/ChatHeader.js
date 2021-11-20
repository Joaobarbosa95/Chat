import React, { useState, useEffect } from "react";
import "./ChatHeader.css";
import { useUserContext } from "../../../Contexts/UserContext";
import { socketInit } from "../../../../utils/socketConnection";

const ChatHeader = () => {
  const { user, setUser } = useUserContext();
  const [connection, setConnection] = useState(false);

  // Don't seem a good place to be/happen
  useEffect(() => {
    user.socket &&
      user.socket.emit("user", {
        name: user.username,
        status: "online",
        image: "",
      });
  }, [connection]);

  if (!connection) {
    return (
      <div className="chat-title">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              username: e.target[0].value,
              stayConnected: e.target[1].checked,
            };

            setUser((prev) => {
              return {
                ...prev,
                username: payload.username,
                stayConnected: payload.stayConnected,
                socket: socketInit(),
              };
            });

            setConnection(true);
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
          user.socket.close();
          setUser((previousUser) => {
            return { ...previousUser, socket: null };
          });
          setConnection(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeader;
