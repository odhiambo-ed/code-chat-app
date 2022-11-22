import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import "../styles/HomePage.css";
import firebase from "firebase";
import db, { auth, store } from "../firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [followed, setFollowed] = useState([]);
  const [visible, setVisible] = useState(false);

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
    setVisible(!visible);
    const uploadTask = store.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const count = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(count);
      },
      (error) => {
        console.log(error);
        setVisible(visible);
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
            await setBody("");
            await setDescription("");
            await setImage(null);
            await setVisible(visible);
            await handleClose();
          });
      }
    );
  };
  return (
    <>
      <Navigation />
      <div className="homeDiv">
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label
                  style={{
                    color: "white",
                  }}
                >
                  Post Body
                </Form.Label>
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  type="text"
                  style={{
                    backgroundColor: "rgb(206, 204, 204)",
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label
                  style={{
                    color: "white",
                  }}
                >
                  Post Description
                </Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                  rows={3}
                  style={{
                    backgroundColor: "rgb(206, 204, 204)",
                  }}
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
            </Form>
            <div className="optionButtons">
              <Button variant="danger" disabled={visible} onClick={handleClose}>
                Cancel
              </Button>
              {visible ? (
                <Spinner animation="border" variant="success" />
              ) : (
                <Button variant="success" onClick={handleUpload}>
                  Create Post
                </Button>
              )}
            </div>
          </Modal.Body>
        </Modal>
        <div
          style={{
            width: "98%",
          }}
        >
          <Row>
            <Col md={3} className="followedProfilesSection">
              <Button onClick={handleShow} variant="outline-secondary">
                New Post
              </Button>
              {followed.length > 0 ? (
                <>
                  {followed.map((val) => (
                    <FollowedProfiles
                      key={val.id}
                      username={val.data.username}
                    />
                  ))}
                </>
              ) : (
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton
                        count={3}
                        width={300}
                        height={50}
                        style={{
                          marginBottom: 20,
                        }}
                      />
                    </p>
                  </SkeletonTheme>
                </div>
              )}
            </Col>
            <Col md={5} className="posts">
              {postData.length > 0 ? (
                <>
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
                </>
              ) : (
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton
                        count={3}
                        height={200}
                        style={{
                          marginBottom: 20,
                        }}
                      />
                    </p>
                  </SkeletonTheme>
                </div>
              )}
            </Col>
            <Col md={4}>
              {postReference.length > 0 ? (
                <Comments postReference={postReference} />
              ) : (
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton
                        count={3}
                        height={50}
                        style={{
                          marginBottom: 20,
                        }}
                      />
                    </p>
                  </SkeletonTheme>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
