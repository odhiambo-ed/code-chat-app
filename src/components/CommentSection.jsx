import React from 'react';
import '../styles/Comment.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { auth } from '../firebase';

const CommentSection = ({ time, username, comment }) => (
  <div
    style={{
      width: '100%',
    }}
  >
    <div className="commentSection">
      <p className="hash">[#]</p>
      <p className="time">
        {moment(new Date(time?.toDate()).toUTCString()).fromNow()}
      </p>
      <p className="username">
        <span
          style={{
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          {'>'}
        </span>
        <span
          style={{
            color: 'green',
            fontWeight: 'bold',
          }}
        >
          {'>'}
        </span>
        <span
          style={{
            color: 'yellow',
            fontWeight: 'bold',
          }}
        >
          {'>'}
        </span>
        {' '}
        {username === auth.currentUser.displayName ? 'You' : username}
      </p>
    </div>
    <div className="individualComment">
      <p className="comment">{comment}</p>
    </div>
  </div>
);

CommentSection.propTypes = {
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default CommentSection;
