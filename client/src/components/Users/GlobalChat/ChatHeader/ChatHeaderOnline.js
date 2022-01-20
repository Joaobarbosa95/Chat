import React from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import OnlineUsersReducer from "../../../Reducers/OnlineUsersReducer";

const ChatHeaderOnline = () => {
  const { user, setUser } = useUserContext();
  const { dispatch } = OnlineUsersReducer();
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
          dispatch({ type: "disconnected chat" });
          user.socket.emit("user left chat");
          user.socket.disconnect();
          setUser((previousUser) => {
            return { ...previousUser, username: null, socket: null };
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeaderOnline;
