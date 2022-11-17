import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import User from "../assets/user.jpeg";
import Comment from "../assets/comments.jpeg";
import Download from "../assets/download.jpeg";
import moment from "moment";
import db, { auth } from "../firebase";

export const Post = ({
  username,
  time,
  body,
  description,
  photo,
  reference,
  setDefaultPost,
  postReference,
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
    let dbCol = "followed" + auth.currentUser.email;
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
    let dbCol = "followed" + auth.currentUser.email;
    db.collection(dbCol).add({
      username: username,
    });
  };
  return (
    <div
      className="postDiv"
      style={{
        border: postReference === reference && "1px solid orangered",
      }}
    >
      <img className="userProfile" src={User} alt="User" />
      <div className="mainDiv">
        {/* Name and Date section */}
        <div className="nameSection">
          <p>{username === auth.currentUser.displayName ? "You" : username}</p>
          <h3>{moment(new Date(time?.toDate()).toUTCString()).fromNow()}</h3>
          {username !== auth.currentUser.displayName && (
            <>
              {followed.length > 0 ? (
                <h3
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  Following
                </h3>
              ) : (
                <button onClick={addFollowed} className="followButton">
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
          <img className="postImage" src={photo} alt="post image" />
        </div>
        {/* Utilities */}
        <div className="utilitiesSection">
          <div className="subUtilities">
            <img
              onClick={() => {
                setDefaultPost(reference);
              }}
              src={Comment}
              alt="comment"
            />
            <p>{comments.length}</p>
          </div>
          <div className="subUtilities">
            <a href={photo} download>
              <img src={Download} alt="download" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
