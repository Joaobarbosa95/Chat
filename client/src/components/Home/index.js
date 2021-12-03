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
            className="login tabs-display"
            style={
              userHasAccount
                ? {
                    background:
                      "radial-gradient(ellipse at 50%, rgba(244, 193, 121, 0.65) 20%, rgba(253, 113, 45, 0.84) 100%)",
                  }
                : {}
            }
          >
            Login
          </div>
          <div
            onClick={() => setUserHasAccount(false)}
            className="create-account tabs-display"
            style={
              userHasAccount
                ? {}
                : {
                    background:
                      "radial-gradient(ellipse at 50%, rgba(244, 193, 121, 0.65) 20%, rgba(253, 113, 45, 0.84) 100%)",
                  }
            }
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
