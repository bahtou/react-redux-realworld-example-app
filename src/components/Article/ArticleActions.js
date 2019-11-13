import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import { useCommonDispatch  } from '../../context/common';


const ArticleActions = ({ canModify, article }) => {
  const history = useHistory();
  const commonDispatch = useCommonDispatch();

  const del = () => {
   commonDispatch({ type: DELETE_ARTICLE, payload: agent.Articles.del(article.slug) });
   history.push('/');
  };

  if (canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};


export default ArticleActions;
