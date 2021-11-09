import React from "react";
import Title from "./Title/Title";
import User from "./User/User";

const mockUsers = [
  { image: "", name: "Johnny", status: "" },
  { image: "", name: "Cabral está on", status: "" },
];

const OnlineUsers = () => {
  return (
    <div className="online-users-container">
      <Title />
      <div className="online-users">
        {mockUsers.map((user) => (
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
