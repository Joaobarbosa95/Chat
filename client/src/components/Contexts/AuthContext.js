import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { socketInit } from "../../utils/socketConnection";
import { validateToken } from "../../services/api/user";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    // Get token, username and sessionId from local storage
    const token = localStorage.getItem("ChatToken");

    // if token, validate it (need to create a route to validate it )
    if (!token) return;

    validateToken(token).then((res) => {
      console.log(res);
      if (res.error) return console.log("invalid token");
      setUser((prevUser) => {
        return {
          ...prevUser,
          username: res.username,
          socket: socketInit(res.username, res.publicProfile._id),
          token: token,
        };
      });

      setAuthed(true);
    });
  }, []);

  // UI/UX problem where after refreshing the page the loggin form appear for a second

  function login() {
    // POST req to validate the form
  }

  function logout() {
    // POST to clear sessionId from server
    // Clear sessionId and Token localStorage
  }
  return (
    <AuthContext.Provider value={{ authed, setAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }) {
  const { authed } = useAuthContext();

  return authed === true ? children : <Navigate to="/home" replace />;
}
