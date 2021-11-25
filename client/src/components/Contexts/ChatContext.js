import React, { useContext } from "react";
import useChatReducer from "../Reducers/ChatReducer";

const ChatContext = React.createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const { messages, dispatch } = useChatReducer();

  return (
    <ChatContext.Provider value={{ messages, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
