import agent from '../agent';
import Header from './Header';
import React, { useEffect } from 'react';
import { APP_LOAD } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';

import { useLocalStorage } from '../hooks';
import {
  AppProvider,
  useAppState,
  useAppDispatch
} from '../context';


function App() {
  const [token] = useLocalStorage('jwt');
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { common } = appState;

  useEffect(() => {
    async function main() {
      let result = {};

      if (token) {
        agent.setToken(token);
        result = await agent.Auth.current();
      }

      appDispatch({
        type: APP_LOAD,
        token,
        payload: {
          user: result.user
        }
      });
    }

    main();
  }, []);

  if (common.appLoaded) {
    return (
      <div>
        <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
    </div>
    );
  }

  return (
    <AppProvider>
      <Header />
    </AppProvider>
  );
}


export default App;
