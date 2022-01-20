import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

import "./Users.css";

const Users = () => {
  return (
    <div className="user-content">
      <GlobalChat />
      <OnlineUsers />
    </div>
  );
};

export default Users;
