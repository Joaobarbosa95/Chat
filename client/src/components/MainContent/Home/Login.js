import React, { useState } from "react";
import { useUserContext } from "../../../Contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { socketInit } from "../../../utils/socketConnection";
import { login } from "../../../services/api/user";
import { useAuthContext } from "../../../Contexts/AuthContext";

const Login = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userDispatch } = useUserContext();
  const { setAuthed } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  async function submitHandle(e) {
    e.preventDefault();

    const res = await login(username, password);

    setUsername("");
    setPassword("");

    if (res.error) return setError("Service Unavailable");

    localStorage.setItem("ChatToken", res.token);
    userDispatch({
      type: "user login",
      payload: {
        username: res.user.username,
        token: res.token,
        socket: socketInit(res.user.username, res.public._id, res.token),
        accountType: "Permanent",
      },
    });
    setAuthed(true);

    if (location.state) {
      navigate(location.state.from.pathname);
    }
  }
  return (
    <div className="login-container">
      <div className="login">
        <div className="login-content">
          <div className="login-logo">
            <img src="" className="logo" alt="LOGO" />
          </div>
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={submitHandle}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
