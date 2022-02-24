import React from "react";
import { useUserContext } from "../../../Contexts/UserContext";

export const User = () => {
  const { user } = useUserContext();

  if (!user.token)
    return <div>You must be logged to view you user profile</div>;

  return <div>This is your profile</div>;
};

export default User;
