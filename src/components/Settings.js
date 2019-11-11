import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import ListErrors from './ListErrors';
import agent from '../agent';
import {
  SETTINGS_SAVED,
  LOGOUT
} from '../constants/actionTypes';

import { useLocalStorage } from '../hooks';
import { useAppState, useAppDispatch  } from '../context';


function SettingsForm({ currentUser, onSubmitForm }) {
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const submitForm = ev => {
    ev.preventDefault();
    setInProgress(true);

    const user = { image, username, bio, email, password };
    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  useEffect(() => {
    if (currentUser) {
      setImage(currentUser.image || '');
      setUsername(currentUser.username);
      setBio(currentUser.bio);
      setEmail(currentUser.email);
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
            onChange={ev => setImage(ev.target.value)} />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={ev => setUsername(ev.target.value)} />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
            value={bio}
            onChange={ev => setBio(ev.target.value)}>
          </textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
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
}

function Settings({ errors }) {
  const [, setJwtToken] = useLocalStorage('jwt');
  const history = useHistory();
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { common:{ currentUser }} = appState;

  const onClickLogout = () => {
    appDispatch({ type: LOGOUT });

    setJwtToken('');
    agent.setToken(null);

    history.push('/');
  };

  const onSubmitForm = async user => {
    appDispatch({ type: SETTINGS_SAVED, payload: await agent.Auth.save(user) });
    history.push('/');
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">

            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors}></ListErrors>

            <SettingsForm
              currentUser={currentUser}
              onSubmitForm={onSubmitForm} />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={onClickLogout}>
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}


export default Settings;
