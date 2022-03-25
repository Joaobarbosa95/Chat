import React, { useState, useContext } from "react";
import useUserReducer from "../Reducers/UserReducer";
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
  const { userState, userDispatch } = useUserReducer();
  //const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
