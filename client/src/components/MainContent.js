import React from "react";
import PropTypes from "prop-types";

import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

const renderSwitch = function (title) {
  switch (title) {
    case "Home":
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
