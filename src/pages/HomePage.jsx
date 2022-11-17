import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import db from "../firebase";

import { Followed } from "../sub-pages/Followed";
import { Body } from "../sub-pages/Body";
import { Comments } from "../sub-pages/Comments";

export const HomePage = () => {
  const [postReference, setPostReference] = useState("");
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setPostData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const setDefaultPost = (reference) => {
    setPostReference(reference);
  };
  return (
    <div className="homeDiv">
      <Followed />
      <Body
        posts={postData}
        postReference={postReference}
        setDefaultPost={setDefaultPost}
      />
      <Comments
        posts={postData}
        setPostReference={setPostReference}
        postReference={postReference}
      />
    </div>
  );
};
