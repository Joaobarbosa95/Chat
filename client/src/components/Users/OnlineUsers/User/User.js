import React from "react";
import { FaUserAlt } from "react-icons/fa";

import "./User.css";

const User = ({ name, image, status }) => {
  return (
    <div className="online-user">
      {image ? (
        <FaUserAlt className="online-user-image" />
      ) : (
        <FaUserAlt className="online-user-image" />
      )}
      <span className="online-username">{name}</span>
    </div>
  );
};

export default User;
