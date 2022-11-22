import React from "react";
import PropTypes from "prop-types";
import "../styles/FollowedProfiles.css";

const FollowedProfiles = ({ username }) => (
  <div className="followedProfileSection">
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${
        username.split(" ")[0]
      }.svg`}
      alt="Followed Profile"
      className="userImage"
    />
    <p className="userName">{!!username && username}</p>
  </div>
);

FollowedProfiles.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FollowedProfiles;
