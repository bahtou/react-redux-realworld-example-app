import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import { useAppDispatch  } from '../../context';


const ArticleActions = ({ canModify, article }) => {
  const appDispatch = useAppDispatch();

  const del = async () => {
   const payload = await agent.Articles.del(article.slug);
   appDispatch({ type: DELETE_ARTICLE, payload })
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
