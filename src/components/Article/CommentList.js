import React from 'react';
import Comment from './Comment';


const CommentList = ({ comments, currentUser, slug }) => {
  return (
    <div>
      {comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={currentUser}
              slug={slug}
              key={comment.id} />
          );
        })
      }
    </div>
  );
};


export default CommentList;
