import React, { useState, useEffect } from "react";
import Title from "./Title/Title";
import User from "./User/User";
import { useUserContext } from "../../../../Contexts/UserContext";
import { useOnlineUsersContext } from "../../../../Contexts/OnlineUsersContext";

const OnlineUsers = () => {
  const { userState, userDispatch } = useUserContext();
  const { username } = userState;
  const { socket, accountType } = userState;
  const { onlineUsers, dispatch } = useOnlineUsersContext();

  useEffect(() => {
    if (!socket) return;

    socket.on("online users", (onlineUsers) => {
      dispatch({ type: "online users", onlineUsers: onlineUsers });
    });

    socket.on("user joined chat", (user) => {
      if (user.username === username) return;
      dispatch({ type: "user joined chat", user: user });
    });

    socket.on("user left chat", (user) => {
      user.username === username
        ? dispatch({ type: "disconnected chat" })
        : dispatch({ type: "user left chat", user: user });
    });

    return () => {
      socket.emit("user left chat");
      if (accountType === "Temporary") {
        socket.disconnect();
        userDispatch({ type: "user disconnect" });
      }

      socket.off("online users");
      socket.off("user joined chat");
      socket.off("user left chat");
    };
  }, [socket]);

  return (
    <div className="online-users-container">
      <Title />
      <div className="online-users">
        {socket &&
          onlineUsers.map((user) => <User key={user.username} user={user} />)}
      </div>
    </div>
  );
};

export default OnlineUsers;
