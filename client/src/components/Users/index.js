import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

const Users = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <>
      <GlobalChat
        onlineUsers={onlineUsers}
        setOnlineUsers={(users) => setOnlineUsers(users)}
      />
      <OnlineUsers
        onlineUsers={onlineUsers}
        setOnlineUsers={(users) => setOnlineUsers(users)}
      />
    </>
  );
};

export default Users;
