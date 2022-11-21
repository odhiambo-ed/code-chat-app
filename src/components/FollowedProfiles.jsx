import React from "react";
import PropTypes from "prop-types";
import User from "../assets/user.png";
import "../styles/FollowedProfiles.css";

const FollowedProfiles = ({ username }) => (
  <div className="followedProfileSection">
    <img src={User} alt="Followed Profile" className="userImage" />
    <p className="userName">{!!username && username.split(" ")[0]}</p>
  </div>
);

FollowedProfiles.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FollowedProfiles;
