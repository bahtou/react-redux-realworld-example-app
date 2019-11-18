import React, { createContext, useContext, useReducer } from 'react';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  ASYNC_START
} from '../actions/actionTypes';


const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
   home: {
    tags: []
  },
  settings: {
    inProgress: null
  },
  router: {}
};

function appStateReducer(state, action) {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        home: {
          ...state.home,
          tags: action.payload.tags
        }
      };
    case HOME_PAGE_UNLOADED:
      return {
        ...state,
        home: {
          ...initialState.home
        }
      };
    /** SETTINGS reducer */
    case SETTINGS_SAVED:
      return {
        ...state,
        settings: {
          ...state.settings,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        }
      };
    case SETTINGS_PAGE_UNLOADED:
        return {
          ...state,
          settings: {
            ...state.settings,
            inProgress: true
          }
        };
    // case ASYNC_START:

    // case ASYNC_START:
    //   console.log('REDUCER:auth', action.type);
    //   let inProgressStates = {};
    //   if (action.subtype === LOGIN || action.subtype === REGISTER) {
    //     inProgressStates = {
    //       auth: {
    //         ...state.auth,
    //         inProgress: true
    //       }
    //     };
    //   }

    //   console.log('REDUCER:editor', action.type);
    //   if (action.subtype === ARTICLE_SUBMITTED) {
    //     inProgressStates = {
    //       editor: {
    //         ...state.editor,
    //         inProgress: true
    //       }
    //     };
    //   }

    //   console.log('REDUCER:settings', action.type);
    //   return {
    //     ...state,
    //     ...inProgressStates,
    //     settings: {
    //       ...state.settings,
    //       inProgress: true
    //     }
    //   };
    default:
      return state;
  }
}

function AppProvider({children}) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  return useContext(AppStateContext);
}

function useAppDispatch() {
  return useContext(AppDispatchContext);
}


export {
  AppProvider,
  useAppState,
  useAppDispatch
};

// export {
//   StateContext,
//   AppDispatchContext,
//   ArticleContext,
//   ArticleListContext,
//   AuthContext,
//   CommonContext,
//   EditorContext,
//   ErrorContext,
//   HomeContext,
//   ProfileContext,
//   SettingsContext
// };
