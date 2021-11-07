import React, { useState } from "react";
import MainContent from "../MainContent/MainContent";
import {
  FaUserAlt, // User
  FaHome, // Home
  FaTelegramPlane, // Send
  FaInbox, // Inbox
  FaUsers, // Users
  FaBell, // Notifications
  FaEllipsisH, // Options
  FaCog, // Settings
} from "react-icons/fa";
import Icon from "./Icon";

const LeftMenu = () => {
  const tabs = [
    {
      icon: FaUserAlt,
      classes: "user",
      title: "User",
      active: true,
    },
    {
      icon: FaHome,
      classes: null,
      title: "Home",
      active: false,
    },
    {
      icon: FaTelegramPlane,
      classes: null,
      title: "Send",
      active: false,
    },
    {
      icon: FaInbox,
      classes: null,
      title: "Inbox",
      active: false,
    },
    {
      icon: FaUsers,
      classes: null,
      title: "Users",
      active: false,
    },
    {
      icon: FaBell,
      classes: null,
      title: "Notifications",
      active: false,
    },
    {
      icon: FaEllipsisH,
      classes: null,
      title: "Options",
      active: false,
    },
    {
      icon: FaCog,
      classes: "settings",
      title: "Settings",
      active: false,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  return (
    <>
      <div className="left-menu">
        {tabs.map((tab) => (
          <Icon
            Icon={tab.icon}
            classes={tab.classes}
            title={tab.title}
            key={tab.title}
            activeTab={activeTab}
            onClick={(title) => setActiveTab(title)}
          />
        ))}
      </div>
      <MainContent activeTab={activeTab} />
    </>
  );
};

export default LeftMenu;
