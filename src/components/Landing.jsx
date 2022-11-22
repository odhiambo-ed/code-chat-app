import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/Post.css";
import moment from "moment";
import PropTypes from "prop-types";
import "../styles/Comments.css";

const Landing = ({ username, time, body, description, photo }) => (
  <Card
    className="postDiv"
    style={{
      marginBottom: 20,
      marginTop: 20,
    }}
  >
    <Card.Body>
      <div>
        <div className="mainDiv">
          {/* Name and Date section */}
          <img
            className="userProfile"
            src={`https://avatars.dicebear.com/api/avataaars/${
              username.split(" ")[0]
            }.svg`}
            alt="User"
          />
          <div className="nameSection">
            <div
              style={{
                marginTop: 10,
              }}
            >
              <p>{username}</p>
              <h3
                style={{
                  marginRight: 20,
                  marginTop: -13,
                }}
              >
                {moment(new Date(time?.toDate()).toUTCString()).fromNow()}
              </h3>
            </div>
          </div>
          {/* Post Title */}
          <div className="postTitle">
            <h2 className="postTitleText">{body}</h2>
          </div>
          {/* Post Body */}
          <div className="postBody">
            <p>{description}</p>
            <img className="postImage" src={photo} alt="post" />
          </div>
          {/* Utilities */}
        </div>
      </div>
    </Card.Body>
  </Card>
);

Landing.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default Landing;
