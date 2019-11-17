import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import agent from '../agent';

import { PROFILE_PAGE_LOADED } from '../constants/actionTypes';
import { useFetch } from '../hooks';

import UserInfo from '../components/UserInfo';
import Favorites from '../components/Favorites';


const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { response, error, isLoading } = useFetch(
    agent.Profiles.get(username),
    agent.Articles.byAuthor(username)
  );

  useEffect(() => {
    if (!response) return;

    dispatch({
      type: PROFILE_PAGE_LOADED,
      payload: {
        profile: response[0].profile,
        articles: response[1].articles,
        articlesCount: response[1].articlesCount
      }
    });
  }, [response]);

  return (
    <div className="profile-page">

      <UserInfo />
      <Favorites />

    </div>
  );
};


export default Profile;
