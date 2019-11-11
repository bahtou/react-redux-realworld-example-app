import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import ListErrors from './ListErrors';
import agent from '../agent';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

import { useLocalStorage } from '../hooks';
import { useAppState, useAppDispatch  } from '../context';


function Login ({ errors }) {
  const [, setJwtToken] = useLocalStorage('jwt', '');
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const  { auth } = appState;
  const { email, password, inProgress } = auth;

  const changeEmail = ev => appDispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value: ev.target.value });
  const changePassword = ev => appDispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value: ev.target.value });

  const submitForm = (email, password) => async ev => {
    ev.preventDefault();

    const { user, error } = await agent.Auth.login(email, password);
    if (!error) {
      setJwtToken(user.token);
      agent.setToken(user.token);

      appDispatch({
        type: LOGIN,
        payload: {
          user,
          token:  user.token
        }
      });

      history.push('/');
      return;
    }

    appDispatch({
      type: LOGIN,
      error
    });
  };

  useEffect(() => {
    return () => appDispatch({ type: LOGIN_PAGE_UNLOADED });
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">
                Need an account?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword} />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress}>
                  Sign in
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Login;
