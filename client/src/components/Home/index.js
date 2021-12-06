import React, { useState } from "react";
import "./Home.css";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const Home = () => {
  const [userHasAccount, setUserHasAccount] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="home-container">
      {error ? <div className="login-error">{error}</div> : ""}
      <div className="home">
        <div className="tabs">
          <div
            onClick={() => setUserHasAccount(true)}
            className={`login tabs-display ${
              userHasAccount ? "tab-active" : ""
            }`}
          >
            Login
          </div>
          <div
            onClick={() => setUserHasAccount(false)}
            className={`create-account tabs-display ${
              userHasAccount ? "" : "tab-active"
            }`}
          >
            Create account
          </div>
        </div>
        <div className="tabs-content">
          {userHasAccount ? (
            <Login setError={(message) => setError(message)} />
          ) : (
            <CreateAccount setError={(message) => setError(message)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
