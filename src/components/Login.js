import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import agent from '../agent';

import { UPDATE_FIELD_AUTH, LOGIN } from '../constants/actionTypes';

import { useLocalStorage } from '../hooks';
import { useAuthState, useAuthDispatch  } from '../context/auth';
import { useCommonDispatch  } from '../context/common';
import ListErrors from './ListErrors';


function Login ({ errors }) {
  const [, setJwtToken] = useLocalStorage('jwt', '');
  const auth = useAuthState();
  const authDispatch = useAuthDispatch();
  const commonDispatch = useCommonDispatch();
  const history = useHistory();

  const { email, password, inProgress } = auth;

  const changeEmail = ev => authDispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value: ev.target.value });
  const changePassword = ev => authDispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value: ev.target.value });

  const submitForm = (email, password) => async ev => {
    ev.preventDefault();

    const { user, error } = await agent.Auth.login(email, password);
    if (!error) {
      setJwtToken(user.token);
      agent.setToken(user.token);

      authDispatch({ type: LOGIN });
      commonDispatch({ type: LOGIN, payload: { user, token:  user.token } });

      history.push('/');
      return;
    }

    authDispatch({
      type: LOGIN,
      error
    });
  };

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
