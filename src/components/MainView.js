import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../agent';

import { CHANGE_TAB } from '../constants/actionTypes';

import ArticleContainer from './articles';


const YourFeedTab = ({ token, tab, onTabClick }) => {
  if (token) {
    const clickHandler = async ev => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, await agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = ({ onTabClick, tab }) => {
  const clickHandler = async ev => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, await agent.Articles.all());
  };

  return (
    <li className="nav-item">
      <a
        href=""
        className={ tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = ({ tag }) => {
  if (!tag) return null;

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {tag}
      </a>
    </li>
  );
};

const MainView = ({ loading }) => {
  const dispatch = useDispatch();
  const { shared, articleList } = useSelector(state => state);
  const { token } = shared;

  const { articles, articlesCount, currentPage, pager, tab, tag } = articleList;

  const onTabClick = (tab, pager, payload) => {
    dispatch({
      type: CHANGE_TAB,
      tab,
      pager,
      payload
    });
  };

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={token}
            tab={tab}
            onTabClick={onTabClick} />

          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

          <TagFilterTab tag={tag} />

        </ul>
      </div>

      <ArticleContainer
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage} />
    </div>
  );
};


export default MainView;
