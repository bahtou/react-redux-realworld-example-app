import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory  } from 'react-router-dom';

import agent from '../agent';

import { UPDATE_FIELD_USER, LOGIN } from '../constants/actionTypes';

import { useLocalStorage } from '../hooks';
import { useUserState, useUserDispatch  } from '../context/user';
import ListErrors from '../components/ListErrors';
import { UserLayoutComponent } from '../pages/_layouts';


function Login ({ errors }) {
  const [, setJwtToken] = useLocalStorage('jwt', '');
  const user = useUserState();
  const userDispatch = useUserDispatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, inProgress } = user;

  const changeEmail = ev => userDispatch({ type: UPDATE_FIELD_USER, key: 'email', value: ev.target.value });
  const changePassword = ev => userDispatch({ type: UPDATE_FIELD_USER, key: 'password', value: ev.target.value });

  const submitForm = (email, password) => async ev => {
    ev.preventDefault();

    const { user, error } = await agent.Users.login(email, password);
    if (!error) {
      setJwtToken(user.token);
      agent.setToken(user.token);

      userDispatch({ type: LOGIN });
      dispatch({ type: LOGIN, payload: { user, token:  user.token } });

      history.push('/');
      return;
    }

    userDispatch({
      type: LOGIN,
      error
    });
  };

  return (
    <div className="auth-page">

      <UserLayoutComponent>
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
      </UserLayoutComponent>

    </div>
  );
}


export default Login;
