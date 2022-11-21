import React, { useState, useEffect, useRef } from "react";
import "../styles/Comments.css";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import firebase from "firebase";
import db, { auth } from "../firebase";
import CommentSection from "./CommentSection";

const Comments = ({ postReference }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postReference.length > 0) {
      db.collection(postReference)
        .orderBy("time", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [postReference]);
  const dummy = useRef();
  const sendComment = (e) => {
    e.preventDefault();
    if (postReference) {
      db.collection(postReference)
        .add({
          comment,
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
    <div>
      <div
        style={{
          overflow: "auto",
          textAlign: "justify",
          height: "70vh",
        }}
      >
        <div>
          {comments.map((item) => (
            <CommentSection
              key={item.id}
              username={item.data.username}
              time={item.data.time}
              comment={item.data.comment}
            />
          ))}
        </div>
        <div ref={dummy} />
      </div>
      {postReference && (
        <Form className="chatSection" onSubmit={(e) => sendComment(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              style={{
                width: "450px",
              }}
              placeholder="Write a comment..."
            />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

Comments.propTypes = {
  postReference: PropTypes.string.isRequired,
};

export default Comments;
