import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import agent from '../agent';

import { UPDATE_FIELD_USER, REGISTER } from '../constants/actionTypes';
import { useUserState, useUserDispatch  } from '../context/user';
import ListErrors from '../components/ListErrors';
import { UserLayoutComponent } from '../pages/_layouts';


const Register = ({ errors }) => {
  const user = useUserState();
  const userDispatch = useUserDispatch();
  const dispatch = useDispatch();

  const { email, password, username,inProgress } = user;

  const changeEmail = ev => userDispatch({ type: UPDATE_FIELD_USER, key: 'email', value: ev.target.value });
  const changePassword = ev => userDispatch({ type: UPDATE_FIELD_USER, key: 'password', value: ev.target.value });
  const changeUsername = ev => userDispatch({ type: UPDATE_FIELD_USER, key: 'username', value: ev.target.value });

  const submitForm = (username, email, password) => async ev => {
    ev.preventDefault();
    const payload = await agent.Users.register(username, email, password);
    userDispatch({ type: REGISTER })
    dispatch({ type: REGISTER, payload })
  };

  return (
    <div className="auth-page">

      <UserLayoutComponent>
        <h1 className="text-xs-center">Sign Up</h1>
        <p className="text-xs-center">
          <Link to="/login">
            Have an account?
          </Link>
        </p>

        <ListErrors errors={errors} />

        <form onSubmit={submitForm(username, email, password)}>
          <fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Username"
                value={username}
                onChange={changeUsername} />
            </fieldset>

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
              Sign up
            </button>

          </fieldset>
        </form>
      </UserLayoutComponent>

    </div>
  );
};


export default Register;
