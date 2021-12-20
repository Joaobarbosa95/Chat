import React from "react";
import "./aboutUser.css";
import { FaUserCircle } from "react-icons/fa";

const AboutUser = () => {
  const user = {
    avatar: null,
  };

  return (
    <div className="user-account-info">
      <div className="general-info">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="avatar-info" />
        ) : (
          <FaUserCircle className="avatar-info" />
        )}
        <p className="name">Name</p>
        <p className="from">From</p>
        <p className="description">
          awerawerrrrrrrrrr awerrrrrrrrrrrrrrrrrrrrrrrrrr awaaaaaaaaaaaaaaaaaaaa
          wwwwwwww hhhhhhhhhhhhh eeeeeeeeee
        </p>
      </div>
      <div className="contact-info">
        <p className="info-description">Phone: </p>{" "}
        <p className="info-description-value"> 234234234p </p>
        <p className="info-description">Email: </p>{" "}
        <span className="info-description-value"> 234234234e </span>
        <p className="info-description">Other: </p>{" "}
        <span className="info-description-value"> 234234234o </span>
      </div>
      <div className="other-info">Mucho mas</div>
    </div>
  );
};

export default AboutUser;
