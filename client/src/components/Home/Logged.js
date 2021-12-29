import React, { useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/api/user";
import { useAuthContext } from "../Contexts/AuthContext";

export const Logged = () => {
  const { user } = useUserContext();
  const { setAuthed } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) navigate(location.state.from.pathname);
  }, []);

  return (
    <div>
      You are logge as {user.username}{" "}
      <button
        onClick={() => {
          logout(user);
          setAuthed(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logged;
