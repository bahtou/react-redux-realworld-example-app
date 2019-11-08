import React from 'react';
import agent from '../../agent';
import { DELETE_COMMENT } from '../../constants/actionTypes';
import { useAppDispatch  } from '../../context';


const DeleteButton = ({ show, slug, commentId }) => {
  const appDispatch = useAppDispatch();

  const del = async () => {
    const payload = await agent.Comments.delete(slug, commentId);
    appDispatch({ type: DELETE_COMMENT, payload, commentId })
  };

  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};


export default DeleteButton;
