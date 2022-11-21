import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/HomePage.css";
import firebase from "firebase";
import db, { auth, store } from "../firebase";

import Footer from "../components/Footer";

import Navigation from "../components/Navigation";
import Post from "../components/Post";
import FollowedProfiles from "../components/FollowedProfiles";
import Comments from "../components/Comments";

const HomePage = () => {
  const [postReference, setPostReference] = useState("");
  const [postData, setPostData] = useState([]);
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const dbCol = `followed${auth.currentUser.email}`;
    db.collection(dbCol).onSnapshot((snapshot) => {
      setFollowed(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = store.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const count = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(count);
      },
      (error) => {
        console.log(error);
      },
      () => {
        store
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            await db
              .collection("posts")
              .add({
                username: auth.currentUser.displayName,
                postBody: body,
                postDescription: description,
                photo: url,
                time: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(async () => {});
            await setProgress(0);
            await setBody("");
            await setDescription("");
            await setImage(null);
            await handleClose();
          });
      }
    );
  };
  return (
    <>
      <Navigation />
      <div className="homeDiv">
        <Button
          variant="primary"
          style={{
            marginBottom: 10,
          }}
          onClick={handleShow}
        >
          Create New Post
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post Body</Form.Label>
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  type="email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Post Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <input
                id="file-input"
                type="file"
                accept=".gif, .png, .jpeg, .jpg"
                onChange={handleFile}
                style={{
                  color: "white",
                }}
              />
              <p
                style={{
                  color: "white",
                }}
              >
                {progress}
              </p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleUpload}>
              Create Post
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          style={{
            width: "98%",
          }}
        >
          <Row>
            <Col
              md={3}
              style={{
                overflow: "auto",
                textAlign: "justify",
                height: "75vh",
              }}
            >
              {followed.map((val) => (
                <FollowedProfiles key={val.id} username={val.data.username} />
              ))}
            </Col>
            <Col
              md={5}
              style={{
                overflow: "auto",
                textAlign: "justify",
                height: "75vh",
              }}
            >
              {postData.map((item) => (
                <Post
                  key={item.id}
                  reference={item.id}
                  username={item.data.username}
                  time={item.data.time}
                  body={item.data.postBody}
                  description={item.data.postDescription}
                  photo={item.data.photo}
                  postReference={postReference}
                  setDefaultPost={setDefaultPost}
                />
              ))}
            </Col>
            <Col md={4}>
              <Comments postReference={postReference} />
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
