import React, { useState, useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { socketInit } from "../utils/socketConnection";
import { validateToken } from "../services/api/user";

const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const { userDispatch } = useUserContext();

  useEffect(() => {
    // Get token, username and sessionId from local storage
    const token = localStorage.getItem("ChatToken");

    // if token, validate it (need to create a route to validate it )
    if (!token) return;

    validateToken(token).then((res) => {
      if (res.error) return console.log("invalid token");
      userDispatch({
        type: "user login",
        payload: {
          username: res.username,
          socket: socketInit(res.username, res.publicProfile._id, token),
          token: token,
          accountType: "Permanent",
        },
      });

      setAuthed(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }) {
  const { authed } = useAuthContext();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
}