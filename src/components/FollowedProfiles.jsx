import React from "react";
import User from "../assets/user.jpeg";

export const FollowedProfiles = ({ username }) => {
  return (
    <div className="followedProfileSection">
      <img src={User} alt="Followed Profile" />
      <p>{username.split(" ")[0]}</p>
    </div>
  );
};
