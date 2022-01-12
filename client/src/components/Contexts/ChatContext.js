import React, { useContext, useState } from "react";

const ChatContext = React.createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [activeDialogue, setActiveDialogue] = useState("");
  const [publicId, setPublicId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <ChatContext.Provider
      value={{
        activeDialogue,
        setActiveDialogue,
        setPublicId,
        publicId,
        username,
        setUsername,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
