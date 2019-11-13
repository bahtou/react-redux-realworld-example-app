import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import agent from '../agent';

import { APP_LOAD } from '../constants/actionTypes';
import { AppProvider } from '../context';
import { useCommonState, useCommonDispatch  } from '../context/common';
import { ProfileProvider } from '../context/profile';
import { ArticleProvider } from '../context/article';
import { EditorProvider } from '../context/editor';
import { ArticleListProvider } from '../context/articleList';
import { AuthProvider } from '../context/auth';
import { useLocalStorage } from '../hooks';

import Header from './Header';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';


const App = () => {
  const [token] = useLocalStorage('jwt');
  const { appLoaded } = useCommonState();
  const commonDispatch = useCommonDispatch();

  useEffect(() => {
    async function main() {
      let result = {};

      if (token) {
        agent.setToken(token);
        result = await agent.Auth.current();
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

  if (appLoaded) {
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
              <AuthProvider>
                <Login />
              </AuthProvider>
            </Route>

            <Route path="/register">
              <AuthProvider>
                <Register />
              </AuthProvider>
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
                  <ProfileFavorites />
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
  }

  return (
    <AppProvider>
      <Header />
    </AppProvider>
  );
};


export default App;
