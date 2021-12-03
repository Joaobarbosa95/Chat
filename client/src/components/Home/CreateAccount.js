import React, { useState } from "react";

const CreateAccount = ({ setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => console.log(res));
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
