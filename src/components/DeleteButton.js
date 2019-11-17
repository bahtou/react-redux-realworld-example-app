import React from 'react';

import agent from '../agent';
import { DELETE_COMMENT } from '../constants/actionTypes';
import { useArticleDispatch  } from '../context/article';


const DeleteButton = ({ show, slug, commentId }) => {
  const articleDispatch = useArticleDispatch();

  const del = async () => {
    const payload = await agent.Comments.delete(slug, commentId);
    articleDispatch({ type: DELETE_COMMENT, payload, commentId })
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
