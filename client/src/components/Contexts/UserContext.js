import React, { useState, useContext, useEffect } from "react";

const UserContext = React.createContext();

const defaultUser = {
  username: null,
  stayConnected: false,
  socket: null,
  accountType: "Temporary",
};

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
