import React from "react";
import PropTypes from "prop-types";
import User from "../assets/user.png";

const FollowedProfiles = ({ username }) => (
  <div className="followedProfileSection">
    <img src={User} alt="Followed Profile" className="userImage" />
    <p>{!!username && username.split(" ")[0]}</p>
  </div>
);

FollowedProfiles.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FollowedProfiles;
