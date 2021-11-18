import React, { useState } from "react";
import Title from "./Title/Title";
import User from "./User/User";
import { useUserContext } from "../../Contexts/UserContext";
import userEvent from "@testing-library/user-event";

const OnlineUsers = () => {
  const { user } = useUserContext();
  const [onlineUsers, setOnlineUsers] = useState([]);

  if (!user.socket) {
    return (
      <div className="online-users-container">
        <Title />
        <div className="online-users"></div>
      </div>
    );
  }

  user.socket.on("online-users", (users) => {
    setOnlineUsers(users);
  });

  user.socket.on("new-user", (users) => {
    setOnlineUsers(users);
  });

  user.socket.on("user-disconnect", (users) => {
    setOnlineUsers(users);
  });

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
