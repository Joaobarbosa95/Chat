import React, { useState, useEffect } from "react";
import "./ChatHeader.css";
import { useUserContext } from "../../../Contexts/UserContext";
import { socketInit } from "../../../../utils/socketConnection";

import ChatHeaderOnline from "./ChatHeaderOnline";
import ChatHeaderSignIn from "./ChatHeaderSignIn";

const ChatHeader = () => {
  const { user } = useUserContext();

  return (
    <>
      {user.username ? (
        <ChatHeaderOnline />
      ) : (
        <ChatHeaderSignIn />
      )}
    </>
  );
};

export default ChatHeader;
