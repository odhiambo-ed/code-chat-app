import React from "react";
import "../styles/HomePage.css";
import { Post } from "../components/Post";

export const Body = ({ posts, setDefaultPost, postReference }) => {
  return (
    <div className="bodyDiv">
      {posts.map((item) => {
        return (
          <Post
            key={item.id}
            reference={item.id}
            username={item.data.username}
            time={item.data.time}
            body={item.data.postBody}
            description={item.data.postDescription}
            photo={item.data.photo}
            setDefaultPost={setDefaultPost}
            postReference={postReference}
          />
        );
      })}
    </div>
  );
};
