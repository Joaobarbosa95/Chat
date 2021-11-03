import React from "react";
import PropTypes from "prop-types";
import { FaUserAlt } from "react-icons/fa";

const OnlineUsers = (props) => {
  return (
    <div className="online-users-container">
      <div className="online-users-title">Online Members</div>

      <div className="online-users">
        <div className="online-user">
          <FaUserAlt className="online-user-image" />
          <span className="online-username">Johnny boy</span>
        </div>
        <div className="online-user">
          <FaUserAlt className="online-user-image" />
          <span className="online-username">eduardo maos de tesoura</span>
        </div>
      </div>
    </div>
  );
};

OnlineUsers.propTypes = {};

export default OnlineUsers;
