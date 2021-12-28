import React, { useState, useContext } from "react";
import { socketInit } from "../../utils/socketConnection";

const UserContext = React.createContext();

const defaultUser = {
  username: null,
  stayConnected: false,
  socket: null,
  accountType: "Temporary",
  token: null,
};

// defaultUser.username = localStorage.getItem("ChatUsername");
// defaultUser.token = localStorage.getItem("ChatToken");

// if (defaultUser.token) defaultUser.socket = socketInit();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
