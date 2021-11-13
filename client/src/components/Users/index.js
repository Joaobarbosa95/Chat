import React, { useState, useEffect } from "react";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";

import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const Users = () => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = ioClient(ENDPOINT);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  if (socket) {
    socket.on("connect", () => {
      console.log("Connected");

      // Online users initial fetch
      socket.on("online-users", (data) => {
        setOnlineUsers(data);
      });

      // New user connection
      socket.on("new-user", ({ onlineUsers: updateOnlineUsers, newUser }) => {
        console.log(`${newUser} connected`);
        setOnlineUsers(updateOnlineUsers);
      });

      // Disconnect
      socket.on(
        "user-disconnect",
        ({ onlineUsers: updateOnlineUsers, newUser }) => {
          console.log(`${newUser} disconnected`);

          setOnlineUsers(updateOnlineUsers);
        }
      );
    });
  }

  return (
    <>
      <GlobalChat />
      <OnlineUsers users={onlineUsers} />
    </>
  );
};

export default Users;
