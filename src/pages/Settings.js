import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import agent from '../agent';

import { LOGOUT } from '../actions/actionTypes';
import { useLocalStorage } from '../hooks';
import { SettingsLayoutComponent } from './_layouts';
import SettingsForm from '../components/SettingsForm';
import ListErrors from '../components/ListErrors';


const Settings = ({ errors }) => {
  const [, setJwtToken] = useLocalStorage('jwt');
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch({ type: LOGOUT });

    setJwtToken('');
    agent.setToken(null);

    history.push('/');
  };

  return (
    <SettingsLayoutComponent>
      <h1 className="text-xs-center">Your Settings</h1>

      <ListErrors errors={errors} />

      <SettingsForm />

      <hr />

      <button
        className="btn btn-outline-danger"
        onClick={onClickLogout}>
        Or click here to logout.
      </button>
    </SettingsLayoutComponent>
  );
};


export default Settings;
