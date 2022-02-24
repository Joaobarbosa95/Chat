import React from "react";
import { FaUserAlt } from "react-icons/fa";

import "./User.css";

const User = ({ user }) => {
  const { username, image, status } = user;
  return (
    <div className="online-user">
      {image ? (
        <FaUserAlt className="online-user-image" />
      ) : (
        <FaUserAlt className="online-user-image" />
      )}
      <span className="online-username">{username}</span>
    </div>
  );
};

export default User;
