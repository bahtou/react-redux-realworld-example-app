import React from 'react';
import { Link } from 'react-router-dom';

import CommentInput from './CommentInput';
import Comment from './Comment';


const CommentContainer = ({ currentUser, slug, errors, comments }) => {
  if (currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={errors}></list-errors>
          <CommentInput slug={slug} currentUser={currentUser} />
        </div>

        {comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={currentUser}
              slug={slug}
              key={comment.id} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        {comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={currentUser}
              slug={slug}
              key={comment.id} />
          );
        })}
      </div>
    );
  }
};


export default CommentContainer;
