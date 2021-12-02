import React, { useState } from "react";
import "./Login.css";

const CreateAccount = () => {
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
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={submitHandle}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="repeat-password"
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button type="submit">Create account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
