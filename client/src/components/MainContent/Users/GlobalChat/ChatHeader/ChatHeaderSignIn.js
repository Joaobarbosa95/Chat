import React, { useState } from "react";
import { useUserContext } from "../../../../../Contexts/UserContext";
import { socketInit } from "../../../../../utils/socketConnection";

const ChatHeaderSignIn = () => {
  const [username, setUsername] = useState("");
  const { userDispatch } = useUserContext();
  return (
    <div className="chat-title">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userDispatch({
            type: "login global chat",
            payload: {
              username: username,
              stayConnected: e.target[1].checked,
              socket: socketInit(username),
            },
          });
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="stayConnected">Stay Connected: </label>
        <input type="checkbox" name="stayConnected" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default ChatHeaderSignIn;
