import React, { useState, useEffect } from "react";
import "./ChatHeader.css";
import { useUserContext } from "../../../../../Contexts/UserContext";

import ChatHeaderOnline from "./ChatHeaderOnline";
import ChatHeaderSignIn from "./ChatHeaderSignIn";

const ChatHeader = () => {
  const { userState } = useUserContext();

  return <>{userState.socket ? <ChatHeaderOnline /> : <ChatHeaderSignIn />}</>;
};

export default ChatHeader;
