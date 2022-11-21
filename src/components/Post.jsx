import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import "../styles/Post.css";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import PropTypes from "prop-types";
import User from "../images/user.png";
import Comment from "../images/comments.png";
import Download from "../images/download.png";
import db, { auth } from "../firebase";
import "../styles/Comments.css";
import CommentSection from "./CommentSection";

const Post = ({ username, time, body, description, photo, reference }) => {
  const [comments, setComments] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comment, setComment] = useState("");

  const dummy = useRef();

  useEffect(() => {
    if (currentPost) {
      (async () => {
        const docRef = await db.collection("posts").doc(currentPost);
        docRef.get().then((doc) => {
          if (doc.exists) {
            setPostTitle(doc.data());
          }
        });
        await db
          .collection(currentPost)
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
  }, [currentPost]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const sendComment = (e) => {
    e.preventDefault();
    if (currentPost) {
      db.collection(currentPost)
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
    <Card
      className="postDiv"
      style={{
        marginBottom: 20,
        marginTop: 20,
        border: currentPost === reference && "1px solid orangered",
      }}
    >
      <Card.Body>
        <div>
          <img className="userProfile" src={User} alt="User" />
          <div className="mainDiv">
            {/* Name and Date section */}
            <div className="nameSection">
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
                  onClick={() => {
                    setCurrentPost(reference);
                    handleShow();
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <>
                  {postTitle.username === auth.currentUser.displayName &&
                    "Your Post"}
                </>
                <>
                  {postTitle.username !== auth.currentUser.displayName &&
                    `${postTitle.username}'s Post`}
                </>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="commentsDiv">
                <div>
                  {comments.map((item) => (
                    <CommentSection
                      key={item.id}
                      username={item.data.username}
                      time={item.data.time}
                      comment={item.data.comment}
                    />
                  ))}
                  <div ref={dummy} />
                </div>
              </div>
              <div className="chatSection">
                <Form onSubmit={(e) => sendComment(e)}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Write a comment..."
                    />
                  </Form.Group>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
};

export default Post;
