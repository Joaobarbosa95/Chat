import React, { useState, useEffect } from "react";
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

import { useNavigate, useLocation } from "react-router-dom";
const LeftMenu = () => {
  const tabs = [
    {
      icon: FaUserAlt,
      classes: "user",
      title: "user",
      active: false,
    },
    {
      icon: FaHome,
      classes: null,
      title: "home",
      active: true,
    },
    {
      icon: FaTelegramPlane,
      classes: null,
      title: "send",
      active: false,
    },
    {
      icon: FaInbox,
      classes: null,
      title: "inbox",
      active: false,
    },
    {
      icon: FaUsers,
      classes: null,
      title: "users",
      active: false,
    },
    {
      icon: FaBell,
      classes: null,
      title: "notifications",
      active: false,
    },
    {
      icon: FaEllipsisH,
      classes: null,
      title: "options",
      active: false,
    },
    {
      icon: FaCog,
      classes: "settings",
      title: "settings",
      active: false,
    },
  ];

  let location = useLocation();

  const [activeTab, setActiveTab] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(location.pathname.slice(1).toLowerCase());
  }, [location.pathname]);

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
            onClick={(title) => {
              setActiveTab(title);
              navigate(tab.title);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default LeftMenu;
// <MainContent activeTab={activeTab} />
