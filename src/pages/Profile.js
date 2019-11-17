import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import agent from '../agent';

import { PROFILE_PAGE_LOADED } from '../constants/actionTypes';
import { useProfileDispatch } from '../context/profile';
import { useArticleListDispatch } from '../context/articleList';
import { useFetch } from '../hooks';

import UserInfo from '../components/UserInfo';
import Favorites from '../components/Favorites';


const Profile = () => {
  const { username } = useParams();
  const { response, error, isLoading } = useFetch(
    agent.Profiles.get(username),
    agent.Articles.byAuthor(username)
  );

  const articleListDispatch = useArticleListDispatch();
  const profileDispatch = useProfileDispatch();

  useEffect(() => {
    if (!response) return;

    profileDispatch({ type: PROFILE_PAGE_LOADED, payload: response[0] });
    articleListDispatch({ type: PROFILE_PAGE_LOADED, payload: response[1] });
  }, [response]);

  return (
    <div className="profile-page">

      <UserInfo />
      <Favorites />

    </div>
  );
};


export default Profile;
