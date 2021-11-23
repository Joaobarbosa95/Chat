import React from "react";

const ChatHeaderOnline = ({ user, setUser, setOnlineUsers }) => {
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

export default ChatHeaderOnline;
