import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  DELETE_ARTICLE,

  LOGIN,
  REGISTER,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,

  EDITOR_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  ARTICLE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../actions/actionTypes';


const initialState = {
  appLoaded: false,
  appName: 'Conduit',
  currentUser: null,
  redirectTo: '/',
  token: null,
  viewChangeCounter: 0
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case APP_LOAD:
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
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
        // settings: {
        //   ...state.settings,
        //   inProgress: false,
        //   errors: action.error ? action.payload.errors : null
        // }
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        redirectTo: '/'
      };
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case ARTICLE_PAGE_UNLOADED:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      };
    default:
      return state;
  }
};


export default reducer;


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
