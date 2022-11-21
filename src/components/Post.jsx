import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../styles/Post.css";
import moment from "moment";
import PropTypes from "prop-types";
import User from "../assets/user.png";
import Comment from "../assets/comments.png";
import Download from "../assets/download.png";
import db, { auth } from "../firebase";
import "../styles/Comments.css";

const Post = ({
  username,
  time,
  body,
  description,
  photo,
  reference,
  postReference,
  setDefaultPost,
}) => {
  const [comments, setComments] = useState([]);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    db.collection(reference).onSnapshot((snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const dbCol = `followed${auth.currentUser.email}`;
    db.collection(dbCol)
      .where("username", "==", username)
      .onSnapshot((snapshot) => {
        setFollowed(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const addFollowed = () => {
    const dbCol = `followed${auth.currentUser.email}`;
    db.collection(dbCol).add({
      username,
    });
  };

  return (
    <Card
      className="postDiv"
      onClick={() => {
        setDefaultPost(reference);
      }}
      style={{
        marginBottom: 20,
        marginTop: 20,
        border: postReference === reference && "1px solid orangered",
        cursor: "pointer",
      }}
    >
      <Card.Body>
        <div>
          <div className="mainDiv">
            {/* Name and Date section */}
            <div className="nameSection">
              <img className="userProfile" src={User} alt="User" />
              <p>
                {username === auth.currentUser.displayName ? "You" : username}
              </p>
              <h3
                style={{
                  marginRight: 20,
                }}
              >
                {moment(new Date(time?.toDate()).toUTCString()).fromNow()}
              </h3>
              {username !== auth.currentUser.displayName && (
                <>
                  {followed.length > 0 ? (
                    <h3>Following</h3>
                  ) : (
                    <button
                      type="button"
                      onClick={addFollowed}
                      className="followButton"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
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
            <div className="utilitiesSection">
              <div className="subUtilities">
                <img
                  style={{
                    width: 30,
                  }}
                  src={Comment}
                  alt="comment"
                />
                <p>{comments.length}</p>
              </div>
              <div className="subUtilities">
                <a href={photo} download>
                  <img
                    style={{
                      width: 30,
                    }}
                    src={Download}
                    alt="download"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

Post.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  postReference: PropTypes.string.isRequired,
  setDefaultPost: PropTypes.func.isRequired,
};

export default Post;
