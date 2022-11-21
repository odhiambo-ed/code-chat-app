import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styles/HomePage.css";
import firebase from "firebase";
import db, { auth, store } from "../firebase";

import Body from "../sub-pages/Body";

import Navigation from "../components/Navigation";

const HomePage = () => {
  const [postReference, setPostReference] = useState("");
  const [postData, setPostData] = useState([]);
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
        <Button variant="primary" onClick={handleShow}>
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
        <Body
          posts={postData}
          postReference={postReference}
          setDefaultPost={setDefaultPost}
          setPostReference={setPostReference}
        />
      </div>
    </>
  );
};

export default HomePage;
