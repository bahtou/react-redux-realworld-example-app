import React, { useEffect } from 'react';

import agent from '../../agent';

import { HOME_PAGE_LOADED, APPLY_TAG_FILTER } from '../../constants/actionTypes';
import { useAppDispatch  } from '../../context';
import { useCommonState } from '../../context/common';
import { useArticleListDispatch } from '../../context/articleList';
import { useFetch } from '../../hooks';

import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';


const Home = () => {
  const appDispatch = useAppDispatch();
  const { appName, token } = useCommonState();
  const articleListDispatch = useArticleListDispatch();

  const tab = token ? 'feed' : 'all';
  const articlesPromise = token
    ? agent.Articles.feed
    : agent.Articles.all;
  const { response, error, isLoading } = useFetch(agent.Tags.getAll(), articlesPromise());

  useEffect(() => {
    if (!response) return;

    appDispatch({ type: HOME_PAGE_LOADED, payload: { tags: response[0].tags } });
    articleListDispatch({
      type: HOME_PAGE_LOADED,
      payload: {
        tab,
        pager: articlesPromise,
        tags: response[0].tags,
        articles: response[1].articles,
        articlescount: response[1].articlesCount,
        currentPage: 0
      }
    });
  }, [response]);

  const onClickTag = (tag, pager, payload) => {
    articleListDispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  };

  return (
    <div className="home-page">
      {token
        ? null
        : <Banner appName={appName} />
      }

      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags onClickTag={onClickTag} />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Home;
