import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const Users = () => {
  return (
    <>
      <GlobalChat />
      <OnlineUsers />
    </>
  );
};

export default Users;
