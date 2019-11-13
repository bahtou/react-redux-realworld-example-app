import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import agent from '../agent';

import { UPDATE_FIELD_AUTH, REGISTER } from '../constants/actionTypes';
import { useAuthState, useAuthDispatch  } from '../context/auth';
import { useCommonDispatch  } from '../context/common';
import ListErrors from './ListErrors';


const Register = ({ errors }) => {
  const auth = useAuthState();
  const authDispatch = useAuthDispatch();
  const commonDispatch = useCommonDispatch();

  const { email, password, username,inProgress } = auth;

  const changeEmail = ev => authDispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value: ev.target.value });
  const changePassword = ev => authDispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value: ev.target.value });
  const changeUsername = ev => authDispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value: email.target.value });

  const submitForm = (username, email, password) => async ev => {
    ev.preventDefault();
    const payload = await agent.Auth.register(username, email, password);
    authDispatch({ type: REGISTER })
    commonDispatch({ type: REGISTER, payload })
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
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
          </div>

        </div>
      </div>
    </div>
  );
};


export default Register;
