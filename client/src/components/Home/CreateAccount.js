import React, { useState } from "react";
import { useUserContext } from "../Contexts/UserContext";

const CreateAccount = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setUser } = useUserContext();

  function submitHandle(e) {
    e.preventDefault();

    const url = "http://localhost:4000/user/createAccount";
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        repeatPassword: repeatPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // input control
    if (username.trim().length < 1)
      setError("Username must be at least one character");
    if (password.trim().length < 6)
      setError("Password must be at least 7 characters");
    if (password !== repeatPassword) setError("Passwords don't match");

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setError(res.error);
        console.log(res);
        setUser((prev) => {
          return { ...prev, username: res.user.username, token: res.token };
        });
      });
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-content">
          <div className="login-logo">
            <img src="" className="logo" alt="LOGO" />
          </div>
          <h1 className="login-title">Create Account</h1>
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
            <input
              type="repeat-password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
