import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import agent from './agent';

import { APP_LOAD } from './constants/actionTypes';
import { useCommonState, useCommonDispatch  } from './context/common';
import { ProfileProvider } from './context/profile';
import { ArticleProvider } from './context/article';
import { EditorProvider } from './context/editor';
import { ArticleListProvider } from './context/articleList';
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
  const { appLoaded } = useCommonState();
  const commonDispatch = useCommonDispatch();

  useEffect(() => {
    async function main() {
      let result = {};

      if (token) {
        agent.setToken(token);
        result = await agent.Users.current();
      }

      commonDispatch({
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
        <Route exact path="/">
          <ArticleListProvider>
            <Home />
          </ArticleListProvider>
        </Route>

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

        <Route path="/settings">
          <Settings />
        </Route>

        <Route path="/@:username/favorites">
          <ProfileProvider>
            <ArticleListProvider>
              <Profile />
            </ArticleListProvider>
          </ProfileProvider>
        </Route>

        <Route path="/@:username">
          <ProfileProvider>
            <ArticleListProvider>
              <Profile />
            </ArticleListProvider>
          </ProfileProvider>
        </Route>
      </Switch>
  </div>
  );
};


export default Routes;
