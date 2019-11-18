import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import agent from '../agent';

import { FOLLOW_USER, UNFOLLOW_USER } from '../actions/actionTypes';


const EditProfileSettings = ({ isUser }) => {
  if (!isUser) return null;

  return (
    <Link
      to="/settings"
      className="btn btn-sm btn-outline-secondary action-btn">
      <i className="ion-gear-a"></i> Edit Profile Settings
    </Link>
  );
};

const FollowUserButton = ({ follow, unfollow, user, isUser }) => {
  if (isUser) return null;

  let classes = 'btn btn-sm action-btn';
  classes = user.following
    ? classes += ' btn-secondary'
    : classes += ' btn-outline-secondary';

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
}

const UserInfo = () => {
  const dispatch = useDispatch();
  const { shared, profile } = useSelector(state => state);
  const { currentUser } = shared;

  const onFollow = async username => dispatch({
    type: FOLLOW_USER,
    payload: await agent.Profiles.follow(username)
  });
  const onUnfollow = async username => dispatch({
    type: UNFOLLOW_USER,
    payload: await agent.Profiles.unfollow(username)
  });

  const isUser = currentUser &&
    profile.username === currentUser.username;

  if (!profile) return null;

  return (
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
  );
};


export default UserInfo;
