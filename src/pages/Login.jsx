import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import db, { auth, provider } from "../firebase";

import Landing from "../components/Landing";
import Footer from "../components/Footer";

const Login = () => {
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
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Code-Labs</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <Button
                onClick={() => {
                  auth.signInWithPopup(provider);
                }}
                variant="success"
              >
                Sign In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md={3} />
          <Col md={6}>
            {postData.map((item) => (
              <Landing
                key={item.id}
                username={item.data.username}
                time={item.data.time}
                body={item.data.postBody}
                description={item.data.postDescription}
                photo={item.data.photo}
              />
            ))}
          </Col>
          <Col md={3} />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
