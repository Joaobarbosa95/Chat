import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

const Users = () => {
  return (
    <>
      <GlobalChat />
      <OnlineUsers />
    </>
  );
};

export default Users;
