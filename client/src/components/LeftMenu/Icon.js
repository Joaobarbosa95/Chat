import React from "react";

const SideMenuTab = ({ title, activeTab, classes, onClick, Icon }) => {
  const tabClasses = classes ? "icon-container " + classes : "icon-container";

  const isActive = title === activeTab;

  return (
    <div
      className={tabClasses}
      title={title}
      onClick={() => onClick(title)}
      style={{
        background: isActive
          ? "linear-gradient(270deg, #292f4c -15%, #ff4444 250.71%)"
          : "",
      }}
    >
      {isActive ? <div className="active-icon"></div> : ""}
      <div className="icons">{<Icon />}</div>
    </div>
  );
};

export default SideMenuTab;
