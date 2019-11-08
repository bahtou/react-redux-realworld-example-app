import React, { createContext, useContext, useReducer } from 'react';

import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  DELETE_ARTICLE,
  EDITOR_PAGE_UNLOADED,

  SETTINGS_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes';


const CommonStateContext = createContext();
const CommonDispatchContext = createContext();

const initailState = {
  appLoaded: false,
  appName: 'Conduit',
  currentUser: null,
  redirectTo: '/',
  token: null,
  viewChangeCounter: 0
};

const commonStateReducer = (state, action) => {
  switch (action.type) {
    case APP_LOAD:
      console.log('common', action.type);
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      };
    case LOGOUT:
      console.log('common', action.type);
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return {
        ...state,
        redirectTo: redirectUrl,
       };
    case SETTINGS_SAVED:
      console.log('common', action.type);
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    // case LOGIN:
    // case REGISTER:
    case DELETE_ARTICLE:
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: '/'
        }
      };
    // case ARTICLE_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
      return {
        ...state,
        editor: {}
      };
    case HOME_PAGE_UNLOADED:
    // case PROFILE_PAGE_UNLOADED:
    // case PROFILE_FAVORITES_PAGE_UNLOADED:
    // case LOGIN_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
      console.log('common', action.type);
      return {
        ...state,
        viewChangeCounter: state.common.viewChangeCounter + 1
      };
    default:
      return state;
  }
};

function CommonProvider({children}) {
  const [state, dispatch] = useReducer(commonStateReducer, initailState);

  return (
    <CommonStateContext.Provider value={state}>
      <CommonDispatchContext.Provider value={dispatch}>
        {children}
      </CommonDispatchContext.Provider>
    </CommonStateContext.Provider>
  );
}

function useCommonState() {
  return useContext(CommonStateContext);
}

function useCommonDispatch() {
  return useContext(CommonDispatchContext);
}


export {
  CommonProvider,
  useCommonState,
  useCommonDispatch
};
