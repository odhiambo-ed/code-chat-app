import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => (
  <Navbar fixed="bottom" bg="dark">
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "white",
        }}
      >
        <span>© 2022 Copyright:</span>
        <span
          style={{
            marginLeft: 23,
          }}
        >
          Edward - Code Chat App
        </span>
      </div>
    </Container>
  </Navbar>
);

export default Footer;
