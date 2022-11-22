import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Post from '../components/Post';
import db, { auth } from '../firebase';

import FollowedProfiles from '../components/FollowedProfiles';

const Body = ({ posts, setDefaultPost, postReference }) => {
  const [followed, setFollowed] = useState([]);
  useEffect(() => {
    const dbCol = `followed${auth.currentUser.email}`;
    db.collection(dbCol).onSnapshot((snapshot) => {
      setFollowed(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col md={3}>
          {followed.map((val) => (
            <FollowedProfiles key={val.id} username={val.data.username} />
          ))}
        </Col>
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
};

Body.propTypes = {
  posts: PropTypes.arrayOf().isRequired,
  setDefaultPost: PropTypes.func.isRequired,
  postReference: PropTypes.string.isRequired,
};

export default Body;
