import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

import "./Users.css";

const Users = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <div className="user-content">
      <GlobalChat
        onlineUsers={onlineUsers}
        setOnlineUsers={(users) => setOnlineUsers(users)}
      />
      <OnlineUsers
        onlineUsers={onlineUsers}
        setOnlineUsers={(users) => setOnlineUsers(users)}
      />
    </div>
  );
};

export default Users;
