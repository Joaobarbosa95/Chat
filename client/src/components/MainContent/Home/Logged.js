import React, { useEffect } from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../services/api/user";
import { useAuthContext } from "../../../Contexts/AuthContext";
import { useChatContext } from "../../../Contexts/ChatContext";

export const Logged = () => {
  const { userState } = useUserContext();
  const { setAuthed } = useAuthContext();
  const {
    setActiveDialogue,
    setPublicId,
    setUsername,
    setOnlineUsers,
    setStatus,
  } = useChatContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) navigate(location.state.from.pathname);
  }, []);

  return (
    <div>
      You are logged as {userState.username}{" "}
      <button
        onClick={() => {
          logout(userState);
          setActiveDialogue(null);
          setPublicId(null);
          setUsername(null);
          setOnlineUsers(null);
          setAuthed(false);
          setStatus("offline");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logged;
