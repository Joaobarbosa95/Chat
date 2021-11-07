import React from "react";

import GlobalChat from "../Users/GlobalChat";
import OnlineUsers from "../Users/OnlineUsers/";

const renderSwitch = function (title) {
  switch (title) {
    case "Users":
      return (
        <>
          <GlobalChat />
          <OnlineUsers />
        </>
      );
  }
};

const MainContent = ({ activeTab }) => {
  return <div className="main-content">{renderSwitch(activeTab)}</div>;
};

MainContent.propTypes = {};

export default MainContent;
