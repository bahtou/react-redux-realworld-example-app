import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../agent';

import { HOME_PAGE_LOADED } from '../constants/actionTypes';
import { useFetch } from '../hooks';

import { HomeLayoutComponent } from '../pages/_layouts';
import Banner from '../components/Banner';
import MainView from '../components/MainView';
import SideBar from '../components/SideBar';


const Home = () => {
  const dispatch = useDispatch();
  const { appName, token } = useSelector(state => state.shared);

  const tab = token ? 'feed' : 'all';
  const articlesPromise = token
    ? agent.Articles.feed
    : agent.Articles.all;
  const { response, error, isLoading } = useFetch(agent.Tags.getAll(), articlesPromise());

  useEffect(() => {
    if (!response) return;

    dispatch({
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

  return (
    <div className="home-page">
      {token
        ? null
        : <Banner appName={appName} />
      }

      <HomeLayoutComponent>
        <MainView />
        <SideBar />
      </HomeLayoutComponent>

    </div>
  );
};


export default Home;
