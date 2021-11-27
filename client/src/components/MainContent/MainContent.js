import React from "react";

import Users from "../Users";

const renderSwitch = function (title) {
  switch (title) {
    case "Users":
      return <Users />;
    default:
      return <h1>Under Construction</h1>;
  }
};

const MainContent = ({ activeTab }) => {
  return <div className="main-content">{renderSwitch(activeTab)}</div>;
};

MainContent.propTypes = {};

export default MainContent;
