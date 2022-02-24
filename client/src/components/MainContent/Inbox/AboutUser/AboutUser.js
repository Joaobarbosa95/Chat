import React from "react";
import "./aboutUser.css";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../../../Contexts/UserContext";
import { useChatContext } from "../../../../Contexts/ChatContext";
import usePublicProfileQuery from "../../../../services/hooks/usePublicProfileQuery";

const AboutUser = () => {
  const { user } = useUserContext();
  const { username } = useChatContext();
  const { publicProfile } = usePublicProfileQuery(user.token, username);

  return (
    <div className="about-user-container">
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
    </div>
  );
};

export default AboutUser;
