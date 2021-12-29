import React, { useEffect, useState } from "react";
import "./aboutUser.css";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";
import { fetchPublicProfile } from "../../../services/api/user";

const AboutUser = ({ dialogue, publicProfile, setPublicProfile }) => {
  const { user } = useUserContext();
  const { userOne, userTwo } = dialogue || {};

  const otherUser = user.username === userOne ? userTwo : userOne;

  useEffect(() => {
    fetchPublicProfile(user, otherUser).then((data) =>
      setPublicProfile(data[0])
    );
  }, [dialogue]);

  return (
    <div className="user-account-info">
      <div className="general-info">
        {undefined ? (
          <img src={user.avatar} alt="avatar" className="avatar-info" />
        ) : (
          <FaUserCircle className="avatar-info" />
        )}
        <p className="name">{publicProfile?.username}</p>
        <p className="from">{publicProfile?.from}</p>
        <p className="description">{publicProfile?.description}</p>
      </div>
      <div className="contact-info">
        <p className="info-description">Phone: </p>
        <p className="info-description-value"> {publicProfile?.phone} </p>
        <p className="info-description">Email: </p>
        <p className="info-description-value"> {publicProfile?.email} </p>
        <p className="info-description">Other: </p>
        <p className="info-description-value"> {publicProfile?.other} </p>
      </div>
      <div className="other-info"> {publicProfile?.more}</div>
    </div>
  );
};

export default AboutUser;
