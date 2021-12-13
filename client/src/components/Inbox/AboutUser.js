import React from "react";

const AboutUser = () => {
  return (
    <>
      <div className="general-info">
        <img src="" alt="avatar" />
        <p className="name">Name</p>
        <p className="from">From</p>
        <p className="description">description</p>
      </div>
      <div className="contact-info">
        <p className="info-description">Phone: </p>
        <p className="info-description">Email: </p>
        <p className="info-description">Other: </p>
      </div>
      <div className="other-info"></div>
    </>
  );
};

export default AboutUser;
