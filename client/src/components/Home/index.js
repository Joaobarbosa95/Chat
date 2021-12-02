import React, { useState } from "react";
import "./Home.css";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const Home = () => {
  const [userHasAccount, setUserHasAccount] = useState(false);

  return (
    <div className="home-container">
      <div className="home">
        <div className="tabs">
          <div
            onClick={() => setUserHasAccount(true)}
            className="login"
            style={userHasAccount ? { backgroundColor: "green" } : {}}
          >
            Login
          </div>
          <div
            onClick={() => setUserHasAccount(false)}
            className="create-account"
            style={userHasAccount ? {} : { backgroundColor: "green" }}
          >
            Create account
          </div>
        </div>
        <div className="tabs-content">
          {userHasAccount ? <Login /> : <CreateAccount />}
        </div>
      </div>
    </div>
  );
};

export default Home;
