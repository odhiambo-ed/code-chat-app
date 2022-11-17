import React, { useState, useEffect, useRef } from "react";
import "../styles/HomePage.css";
import "../styles/Comments.css";
import Send from "../assets/send.jpeg";
import { Comment } from "../components/Comment";
import db, { auth } from "../firebase";
import firebase from "firebase";

export const Comments = ({ postReference, posts, setPostReference }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [postTitle, setPostTitle] = useState();

  const dummy = useRef();

  useEffect(() => {
    if (posts.length > 0) {
      setPostReference(posts[0].id);
    }
  }, [posts]);

  useEffect(() => {
    if (postReference) {
      (async () => {
        var docRef = await db.collection("posts").doc(postReference);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setPostTitle(doc.data());
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        await db
          .collection(postReference)
          .orderBy("time", "asc")
          .onSnapshot((snapshot) => {
            setComments(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      })();
    }
  }, [postReference]);

  const sendComment = () => {
    if (postReference) {
      db.collection(postReference)
        .add({
          comment: comment,
          username: auth.currentUser.displayName,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(async () => {
          await setComment("");
          await dummy.current.scrollIntoView({ behavior: "smooth" });
        });
    }
  };

  return (
    <div className="commentsDiv">
      <div className="commentTitle">
        <h3>
          {!postTitle
            ? "No Post Selected"
            : postTitle.username === auth.currentUser.displayName
            ? "Your Post"
            : `${postTitle.username}'s Post`}
        </h3>
      </div>
      {/* Comment Section */}
      <div className="comments">
        {comments.map((item) => {
          return (
            <Comment
              key={item.id}
              username={item.data.username}
              time={item.data.time}
              comment={item.data.comment}
            />
          );
        })}
        <div ref={dummy}></div>
      </div>

      {/* Type Comment Section */}
      <div className="createCommentSection">
        <div className="inputSection">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
        </div>
        <div className="sendSection">
          <img onClick={sendComment} src={Send} alt="send" />
        </div>
      </div>
    </div>
  );
};
