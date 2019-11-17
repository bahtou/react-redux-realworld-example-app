import React from 'react';
import { useHistory } from 'react-router-dom';

import agent from '../agent';

import { LOGOUT } from '../constants/actionTypes';
import { useLocalStorage } from '../hooks';
import { useCommonDispatch  } from '../context/common';
import { SettingsLayoutComponent } from './_layouts';
import SettingsForm from '../components/SettingsForm';
import ListErrors from '../components/ListErrors';


const Settings = ({ errors }) => {
  const [, setJwtToken] = useLocalStorage('jwt');
  const history = useHistory();
  const commonDispatch = useCommonDispatch();

  const onClickLogout = () => {
    commonDispatch({ type: LOGOUT });

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
