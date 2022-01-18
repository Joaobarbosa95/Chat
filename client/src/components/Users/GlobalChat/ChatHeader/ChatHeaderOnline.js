import React from "react";
import { useUserContext } from "../../../Contexts/UserContext";

const ChatHeaderOnline = () => {
  const { user, setUser } = useUserContext();

  return (
    <div className="chat-title chat-online">
      <div>
        <p>Global Chat</p>
        <p>You are logged as {user.username}</p>
      </div>
      <button
        className="logout-btn"
        onClick={() => {
          if (user.accountType === "Permanent") return;

          user.socket.disconnect();
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

export default ChatHeaderOnline;
