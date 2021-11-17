import React from "react";
import Title from "./Title/Title";
import User from "./User/User";

const OnlineUsers = ({ users }) => {
  return (
    <div className="online-users-container">
      <Title />
      <div className="online-users">
        {users.map((user) => (
          <User
            key={user.name}
            image={user.image}
            name={user.name}
            status={user.status}
          />
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
