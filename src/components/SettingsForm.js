import React, { useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import agent from '../agent';
import { SETTINGS_SAVED } from '../constants/actionTypes';
import { useCommonState, useCommonDispatch  } from '../context/common';


const initialState = {
  image: '',
  username: '',
  bio: '',
  email: '',
  password: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, image: action.image };
    case 'SET_USERNAME':
      return { ...state, username: action.username };
    case 'SET_BIO':
      return { ...state, bio: action.bio };
    case 'SET_EMAIL':
      return { ...state, email: action.email };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    case 'SET_CURRENT_USER':
      let { image, ...rest } = action.currentUser;
      return { ...state, ...rest, image: image ? image : '' };
    default:
      return state;
  }
}

const SettingsForm = () => {
  const history = useHistory();
  const { currentUser } = useCommonState();
  const commonDispatch = useCommonDispatch();
  const [user, dispatch] = useReducer(reducer, initialState);
  const { bio, image, username, email, password } = user;

  const [inProgress, setInProgress] = useState(false);

  const submitForm = async ev => {
    const { bio, image, username, email, password } = user;
    let _user = user;

    ev.preventDefault();
    setInProgress(true);

    if (!password) {
      _user = { bio, image, username, email };
    }

    commonDispatch({ type: SETTINGS_SAVED, payload: await agent.Users.save(_user) });
    history.push('/');
  };

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_CURRENT_USER', currentUser });
    }
  }, [currentUser]);

  return (
    <form onSubmit={submitForm}>
      <fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={image}
            onChange={ev => dispatch({ type: 'SET_IMAGE', image: ev.target.value })} />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={ev => dispatch({ type: 'SET_USERNAME', username: ev.target.value })} />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
            value={bio}
            onChange={ev => dispatch({ type: 'SET_BIO', bio: ev.target.value })}>
          </textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={ev => dispatch({ type: 'SET_EMAIL', email: ev.target.value })} />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={ev => dispatch({ type: 'SET_PASSWORD', password: ev.target.value })} />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={inProgress}>
          Update Settings
        </button>

      </fieldset>
    </form>
  );
};


export default SettingsForm;
