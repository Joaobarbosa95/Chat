import React, { useState, useEffect } from "react";
import Title from "./Title/Title";
import User from "./User/User";
import { useUserContext } from "../../Contexts/UserContext";
import { useOnlineUsersContext } from "../../Contexts/OnlineUsersContext";

const OnlineUsers = () => {
  const { user } = useUserContext();
  const { socket } = user;
  const { onlineUsers, dispatch } = useOnlineUsersContext();

  useEffect(() => {
    if (!socket) return;
    socket.emit("get users");

    socket.on("online users", (onlineUsers) => {
      console.log("online users", onlineUsers);
      dispatch({ type: "online users", onlineUsers: onlineUsers });
    });

    socket.on("user joined chat", (user) => {
      dispatch({ type: "user joined the room", user: user });
    });

    socket.on("user left chat", (user) => {
      dispatch({ type: "user left the chat", user: user });
    });

    return () => {
      socket.off("online users");
      socket.off("user joined the room");
      socket.off("user left the chat");
    };
  }, [socket]);

  if (!socket) {
    return (
      <div className="online-users-container">
        <Title />
        <div className="online-users"></div>
      </div>
    );
  }

  return (
    <div className="online-users-container">
      <Title />
      <div className="online-users">
        {onlineUsers.map((user) => (
          <User key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
