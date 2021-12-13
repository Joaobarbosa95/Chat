import React from "react";
import "./inbox.css";

import Dialogues from "./Dialogues";
import Chat from "./Chat";
import AboutUser from "./AboutUser";

const index = () => {
  return (
    <div className="inbox-container">
      <div className="dialogues-container">
        <Dialogues />
      </div>
      <div className="direct-messages-container">
        <Chat />
      </div>
      <div className="about-user-container">
        <AboutUser />
      </div>
    </div>
  );
};

export default index;
