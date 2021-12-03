import React, { useState } from "react";

const Login = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        console.log(res);
        setError("Wrong user or password");
      });

    setUsername("");
    setPassword("");
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
              onChange={(e) => setUsername(e.target.value) && console.log("q")}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value) && console.log("q")}
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
