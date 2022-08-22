import React from "react";
import Like from "../assets/like.jpeg";
import Dislike from "../assets/dislike.jpeg";
import Comments from "../assets/comments.jpeg";
import Download from "../assets/download.jpeg";
import User from "../assets/user.jpeg";
import "../styles/Post.css";

const Post = () => {
  return (
    <div className="postDiv">
      <img src={User} alt="User" className="userProfile" />
      <div className="mainDiv">
        <div className="nameSection">
          <p>Edward</p>
          <h3>23rd Oct 2022</h3>
          <button className="followButton">Follow</button>
        </div>
        <div className="postTitle">
          <h2 className="postTitleText">JavaScript Meeting Chat</h2>
        </div>
        <div className="postBody">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            accusamus molestiae esse doloribus illo ipsum exercitationem quis
            ipsa consequatur! Consequatur quam animi dolorem, atque repellendus
            molestiae accusantium? Accusantium quas corporis quis! Blanditiis
            tempora quas illo harum maxime minima cupiditate veniam id ad
            placeat. Error, aliquam nemo fugit voluptate asperiores voluptas.
          </p>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvitess.io%2Fimg%2Fgit-workflow.png&f=1&nofb=1"
            alt="Post Image"
            className="postImage"
          />
        </div>
        <div className="utilitiesSection">
          <div className="subUtilities">
            <img src={Like} alt="Like" />
            <p>20</p>
          </div>
          <div className="subUtilities">
            <img src={Dislike} alt="Dislike" />
            <p>24</p>
          </div>
          <div className="subUtilities">
            <img src={Comments} alt="Comments" />
            <p>12</p>
          </div>
          <div className="subUtilities">
            <img src={Download} alt="Download" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
