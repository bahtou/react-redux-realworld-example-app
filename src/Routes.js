import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import agent from './agent';

import { APP_LOAD } from './constants/actionTypes';
import { ArticleProvider } from './context/article';
import { EditorProvider } from './context/editor';
import { UserProvider } from './context/user';
import { useLocalStorage } from './hooks';

import Header from './components/Header';
import Article from './pages/Article';
import Editor from './pages/Editor';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Settings from './pages/Settings';


const Routes = () => {
  const [token] = useLocalStorage('jwt');
  const dispatch = useDispatch();
  const { appLoaded } = useSelector(state => state.shared);

  useEffect(() => {
    async function main() {
      let result = {};

      if (token) {
        agent.setToken(token);
        result = await agent.Users.current();
      }

      dispatch({
        type: APP_LOAD,
        token,
        payload: {
          user: result.user
        }
      });
    }

    main();
  }, []);

  if (!appLoaded) return <Header />;

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/login">
          <UserProvider>
            <Login />
          </UserProvider>
        </Route>

        <Route path="/register">
          <UserProvider>
            <Register />
          </UserProvider>
        </Route>

        <Route path="/editor/:slug">
          <EditorProvider>
            <Editor />
          </EditorProvider>
        </Route>

        <Route path="/editor">
          <EditorProvider>
            <Editor />
          </EditorProvider>
        </Route>

        <Route path="/article/:id">
          <ArticleProvider>
            <Article />
          </ArticleProvider>
        </Route>

        <Route path="/settings" component={Settings} />

        <Route path="/@:username/favorites" component={Profile} />

        <Route path="/@:username" component={Profile} />
      </Switch>
  </div>
  );
};


export default Routes;
