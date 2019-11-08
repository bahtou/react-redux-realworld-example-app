import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ArticleList from './ArticleList';
import agent from '../agent';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';
import { useAppState, useAppDispatch  } from '../context';


const EditProfileSettings = ({ isUser }) => {
  if (isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }

  return null;
};

const FollowUserButton = ({ follow, unfollow, user, isUser }) => {
  if (isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (user.following) {
      unfollow(user.username)
    } else {
      follow(user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  );
};

function ProfileFavorites({ match }) {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { common, articleList, profile } = appState;
  const { currentUser } = common;
  const { pager, articles, articlesCount, currentPage } = articleList;

  useEffect(() => {
    const main = async () => {
      const payload = await Promise.all([
        agent.Profile.get(match.params.username),
        agent.Articles.favoritedBy(match.params.username)
      ]);

      appDispatch({
        type: PROFILE_PAGE_LOADED,
        pager:async page => await agent.Articles.favoritedBy(this.props.match.params.username, page),
        payload
      });
    };

    main();
    return () => appDispatch({ type: PROFILE_PAGE_UNLOADED });
  }, []);

  const onFollow = async username => appDispatch({
    type: FOLLOW_USER,
    payload: await agent.Profile.follow(username)
  });
  const onUnfollow = async username => appDispatch({
    type: UNFOLLOW_USER,
    payload: await agent.Profile.unfollow(username)
  });

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };

  if (!profile) {
    return null;
  }

  const isUser = currentUser &&
    profile.username === currentUser.username;

  return (
    <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">

              <img src={profile.image} className="user-img" alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={onFollow}
                unfollow={onUnfollow}
                />

            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">

            <div className="articles-toggle">
              {renderTabs()}
            </div>

            <ArticleList
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              state={currentPage} />
          </div>

        </div>
      </div>

    </div>
  );
}


export default ProfileFavorites;
