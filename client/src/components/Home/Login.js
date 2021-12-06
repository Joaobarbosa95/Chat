import React, { useState } from "react";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  function submitHandle(e) {
    e.preventDefault();
    const url = "http://localhost:4000/user/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setUsername("");
        setPassword("");
        console.log(res);

        if (res.error) return setError(res.error);

        setUser((prev) => {
          return { ...prev, username: res.user.username, token: res.token };
        });

        // navigate("/users");
      });
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
