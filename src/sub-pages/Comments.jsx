import React from "react";
import Comment from "../components/Comment";
import Send from "../assets/send.jpeg";
import "../styles/Comments.css";

const Comments = () => {
  return (
    <div className="commentsDiv">
      <div className="commentTitle">
        <h3>Joe post</h3>
      </div>
      <div className="comments">
        <Comment />
      </div>
      <div className="createCommentSection">
        <div className="inputSection">
          <input type="text" placeholder="Write comments" />
        </div>
        <div className="sendSection">
          <img src={Send} alt="Send Button" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
