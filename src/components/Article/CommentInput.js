import React, { useState } from 'react';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { useAppDispatch  } from '../../context';


function CommentInput({ currentUser, slug }) {
  const [body, setBody] = useState('');
  const appDispatch = useAppDispatch();

  const createComment = async ev => {
    ev.preventDefault();
    const payload = await agent.Comments.create(slug, { body: body });
    setBody('');
    appDispatch({ type: ADD_COMMENT, payload });
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={ev => setBody(ev.target.value)}
          rows="3">
        </textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username} />
        <button
          className="btn btn-sm btn-primary"
          type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}


export default CommentInput;
