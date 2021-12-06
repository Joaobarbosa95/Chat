import React from "react";
import { useUserContext } from "../Contexts/UserContext";

export const Logged = () => {
  const { user } = useUserContext();

  return <div>You are logge as {user.username}</div>;
};

export default Logged;
