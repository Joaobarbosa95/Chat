import React, { useState, useContext } from "react";

const UserContext = React.createContext();

const defaultUser = {
  username: null,
  stayConnected: false,
  socket: null,
  accountType: "Temporary",
  token: null,
};

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
