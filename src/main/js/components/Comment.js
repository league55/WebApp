import React from 'react';

const Comment = (props) => (
  <div className="message">
    <h3>{props.content}</h3>
    <p>By {props.author}</p>
  </div>
);

Comment.propTypes = {
  content: React.PropTypes.string,
  author: React.PropTypes.string
};

export default Comment;
