import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import { useAppState, useAppDispatch  } from '../context';


function Register({ errors }) {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { auth } = appState;
  const { email, password, username,inProgress } = auth;

  const changeEmail = ev => appDispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value: ev.target.value });
  const changePassword = ev => appDispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value: ev.target.value });
  const changeUsername = ev => appDispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value: email.target.value });

  const submitForm = (username, email, password) => async ev => {
    ev.preventDefault();
    const payload = await agent.Auth.register(username, email, password);
    appDispatch({ type: REGISTER, payload })
  };

  useEffect(() => {
    return () => appDispatch({ type: REGISTER_PAGE_UNLOADED });
  }, []);

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
}


export default Register;
