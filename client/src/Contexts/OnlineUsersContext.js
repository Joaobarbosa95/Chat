import React, { useContext } from "react";
import OnlineUsersReducer from "../Reducers/OnlineUsersReducer";

const OnlineUsersContext = React.createContext();

export function useOnlineUsersContext() {
  return useContext(OnlineUsersContext);
}

export function OnlineUsersProvider({ children }) {
  const { onlineUsers, dispatch } = OnlineUsersReducer();

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, dispatch }}>
      {children}
    </OnlineUsersContext.Provider>
  );
}
