import React, { useEffect, useState } from "react";
import "./aboutUser.css";
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../../Contexts/UserContext";

const AboutUser = ({ dialogue, publicProfile }) => {
  const { user } = useUserContext();
  const { userOne, userTwo } = publicProfile;

  const [profile, setProfile] = useState({});

  const otherUser = user.username === userOne ? userTwo : userOne;

  useEffect(() => {
    const url = "http://localhost:4000/inbox/public-profile";

    const bearer = "Bearer " + user?.token;

    const opts = {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: otherUser }),
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((res) => setProfile(res[0]));
  }, [dialogue]);

  return (
    <div className="user-account-info">
      <div className="general-info">
        {undefined ? (
          <img src={user.avatar} alt="avatar" className="avatar-info" />
        ) : (
          <FaUserCircle className="avatar-info" />
        )}
        <p className="name">{profile.username}</p>
        <p className="from">{profile.from}</p>
        <p className="description">{profile.description}</p>
      </div>
      <div className="contact-info">
        <p className="info-description">Phone: </p>
        <p className="info-description-value"> {profile.phone} </p>
        <p className="info-description">Email: </p>
        <p className="info-description-value"> {profile.email} </p>
        <p className="info-description">Other: </p>
        <p className="info-description-value"> {profile.other} </p>
      </div>
      <div className="other-info"> {profile.more}</div>
    </div>
  );
};

export default AboutUser;
