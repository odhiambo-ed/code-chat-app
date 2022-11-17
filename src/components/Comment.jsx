import React from "react";
import "../styles/Comment.css";
import moment from "moment";
import { auth } from "../firebase";

export const Comment = ({ time, username, comment }) => {
  return (
    <div>
      <div className="commentSection">
        <p className="hash">[#]</p>
        <p className="time">
          {moment(new Date(time?.toDate()).toUTCString()).fromNow()}
        </p>
        <p className="username">
          <span
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            {">"}
          </span>
          <span
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            {">"}
          </span>
          <span
            style={{
              color: "yellow",
              fontWeight: "bold",
            }}
          >
            {">"}
          </span>{" "}
          {username === auth.currentUser.displayName ? "You" : username}
        </p>
      </div>
      <div className="individualComment">
        <p className="comment">{comment}</p>
      </div>
    </div>
  );
};
