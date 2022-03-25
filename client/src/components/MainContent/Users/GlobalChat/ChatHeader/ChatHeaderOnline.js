import React from "react";
import { useUserContext } from "../../../../../Contexts/UserContext";
import OnlineUsersReducer from "../../../../../Reducers/OnlineUsersReducer";

const ChatHeaderOnline = () => {
  const { userState, userDispatch } = useUserContext();
  const { dispatch } = OnlineUsersReducer();
  return (
    <div className="chat-title chat-online">
      <div>
        <p>Global Chat</p>
        <p>You are logged as {userState.username}</p>
      </div>
      <button
        className="logout-btn"
        onClick={() => {
          if (userState.accountType === "Permanent") return;
          dispatch({ type: "disconnected chat" });

          userState.socket.emit("user left chat");
          userState.socket.disconnect();

          userDispatch({ type: "user disconnect" });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeaderOnline;
