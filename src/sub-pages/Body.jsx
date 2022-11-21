import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import Post from "../components/Post";

const Body = ({ posts, setDefaultPost, postReference }) => (
  <Container>
    <Row>
      <Col md={3} />
      <Col md={6}>
        {posts.map((item) => (
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
        ))}
      </Col>
      <Col md={3} />
    </Row>
  </Container>
);

Body.propTypes = {
  posts: PropTypes.arrayOf().isRequired,
  setDefaultPost: PropTypes.func.isRequired,
  postReference: PropTypes.string.isRequired,
};

export default Body;
