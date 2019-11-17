import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { useProfileState } from '../context/profile';
import { useArticleListState } from '../context/articleList';
import ArticleContainer from './articles';


const Favorites = () => {
  const { path } = useRouteMatch();
  const articleList = useArticleListState();
  const profile = useProfileState();
  const { pager, articles, articlesCount, currentPage } = articleList;
  let isFavoritesActive = false;

  if (path === '/@:username/favorites') {
    isFavoritesActive = true;
  }

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={`nav-link ${isFavoritesActive ? '' : 'active'}`}
            to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${isFavoritesActive ? 'active' : ''}`}
            to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="favorites">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">

            <div className="articles-toggle">
              {renderTabs()}
            </div>

            <ArticleContainer
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              state={currentPage} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Favorites;
