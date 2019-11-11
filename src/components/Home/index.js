import React, { useEffect } from 'react';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import { useAppState, useAppDispatch  } from '../../context';
import { useCommonState, useCommonDispatch  } from '../../context/common';
import { useFetch } from '../../hooks';


function Home() {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { home } = appState;

  const common = useCommonState();
  const commonDispatch = useCommonDispatch();

  const tab = common.token ? 'feed' : 'all';
  const articlesPromise = common.token
    ? agent.Articles.feed
    : agent.Articles.all;
  const { response, error, isLoading } = useFetch(agent.Tags.getAll(), articlesPromise());

  useEffect(() => {
    if (!response) return;

    appDispatch({
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

    return () => {
      // which to dispatch first? top-bottom, bottom-top?
      appDispatch({  type: HOME_PAGE_UNLOADED });
      commonDispatch({ type: HOME_PAGE_UNLOADED });
    };
  }, [response]);

  const onClickTag = (tag, pager, payload) => {
    appDispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  };

  return (
    <div className="home-page">
      {common.token
        ? null
        : <Banner appName={common.appName} />
      }

      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags
                tags={home.tags}
                onClickTag={onClickTag} />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
