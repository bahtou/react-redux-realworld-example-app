import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useCommonState } from '../../context/common';
import ArticleActions from './ArticleActions';


const ArticleMeta = ({ article }) => {
  const { currentUser } = useCommonState();
  const canModify = currentUser && currentUser.username === article.author.username;

  return (
    <Fragment>
      <h1>{article.title}</h1>

      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <ArticleActions canModify={canModify} article={article} />
      </div>
    </Fragment>
  );
};


export default ArticleMeta;
