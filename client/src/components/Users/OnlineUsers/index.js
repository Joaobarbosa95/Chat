import React, { useState, useEffect } from "react";
import Title from "./Title/Title";
import User from "./User/User";
import { useUserContext } from "../../Contexts/UserContext";

const OnlineUsers = ({ onlineUsers, setOnlineUsers }) => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user.username) {
      user.socket.emit("get-users");

      user.socket.on("online-users", (users) => {
        setOnlineUsers(users);
      });

      user.socket.on("new-user", (users) => {
        setOnlineUsers(users);
      });

      user.socket.on("user-disconnect", (users) => {
        setOnlineUsers(onlineUsers);
      });
    }
    return () => {
      if (user.socket) {
        user.socket.off("online-users");
        user.socket.off("new-user");
        user.socket.off("user-disconnect");
      }
    };
  }, [user.username]);

  if (!user.socket) {
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
          <User
            key={user.name}
            image={user.image}
            name={user.name}
            status={user.status}
          />
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
