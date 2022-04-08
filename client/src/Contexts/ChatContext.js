import React, { useContext, useState } from "react";
const ChatContext = React.createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  // could be just a object variable containing the 3 states
  const [activeDialogue, setActiveDialogue] = useState("");
  const [publicId, setPublicId] = useState("");
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [status, setStatus] = useState("offline");

  return (
    <ChatContext.Provider
      value={{
        activeDialogue,
        setActiveDialogue,
        setPublicId,
        publicId,
        username,
        setUsername,
        onlineUsers,
        setOnlineUsers,
        status,
        setStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
