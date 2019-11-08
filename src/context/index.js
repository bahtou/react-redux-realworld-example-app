import React, { createContext, useContext } from 'react';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT,

  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,

  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH,

  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  DELETE_ARTICLE,
  EDITOR_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,

  EDITOR_PAGE_LOADED,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,

  FOLLOW_USER,
  UNFOLLOW_USER,

  ASYNC_START
} from '../constants/actionTypes';


const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initailState = {
  article: {
    article: {
      title: '',
      slug: '',
      body: '',
      createdAt: '',
      updatedAt: '',
      tagList: [],
      description: '',
      author: {
        username: '',
        bio: null,
        image: '',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    },
    comments: [
      {
        id: 0,
        createdAt: '',
        updatedAt: '',
        body: '',
        author: {
          username: '',
          bio: null,
          image: '',
          following: false
        }
      }
    ]
  },
  articleList: {
    tags: [],
    articles: [],
    articleCount: 0,
    currentPage: 0,
    tab: 'all',
    tag: null,
    pager: null
  },
  auth: {
    username: '',
    email: '',
    password: '',
    inProgress: null
  },
  common: {
    appLoaded: false,
    appName: 'Conduit',
    currentUser: null,
    redirectTo: '/',
    token: null,
    viewChangeCounter: 0
  },
  editor: {
    articleSlug: '',
    title: '',
    description: '',
    body: '',
    tagInput: '',
    tagList: [],
    inProgress: null
  },
  home: {},
  profile: {},
  settings: {
    inProgress: null
  },
  router: {}
};

function appStateReducer(state, action) {
  switch (action.type) {
    /** ARTICLE reducer */
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: {
          ...state.article,
          article: action.payload[0].article,
          comments: action.payload[1].comments
        }
      };
    case ARTICLE_PAGE_UNLOADED:
      return {
        ...state,
        common: {
          ...state.common,
          viewChangeCounter: state.common.viewChangeCounter + 1
        },
        article: {}
      };
    case ADD_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          commentErrors: action.error ? action.payload.errors : null,
          comments: action.error ?
            null :
            (state.comments || []).concat([action.payload.comment])
        }
      };
    case DELETE_COMMENT:
      const commentId = action.commentId
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.comments.filter(comment => comment.id !== commentId)
        }
      };

    /** ARTICLELIST reducer */
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          articles: state.articleList.articles.map(article => {
            if (article.slug === action.payload.article.slug) {
              return {
                ...article,
                favorited: action.payload.article.favorited,
                favoritesCount: action.payload.article.favoritesCount
              };
            }

            return article;
          })
        }
      };
    case SET_PAGE:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          articles: action.payload.articles,
          articlesCount: action.payload.articlesCount,
          currentPage: action.page
        }
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          pager: action.pager,
          articles: action.payload.articles,
          articlesCount: action.payload.articlesCount,
          tab: null,
          tag: action.tag,
          currentPage: 0
        }
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          pager: action.payload.pager,
          tags: action.payload.tags,
          articles: action.payload.articles,
          articlesCount: action.payload.articlesCount,
          currentPage: 0,
          tab: action.payload.tab
        },
        home: {
          ...state.home,
          tags: action.payload.tags
        }
      };
    case HOME_PAGE_UNLOADED:
      return {
        ...state,
        common: {
          ...state.common,
          viewChangeCounter: state.common.viewChangeCounter + 1
        },
        articleList: {},
        home: {}
      };
    case CHANGE_TAB:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          pager: action.pager,
          articles: action.payload.articles,
          articlesCount: action.payload.articlesCount,
          tab: action.tab,
          currentPage: 0,
          tag: null
        }
      };
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload[0].profile
        },
        articleList: {
          ...state.articleList,
          pager: action.pager,
          articles: action.payload[1].articles,
          articlesCount: action.payload[1].articlesCount,
          currentPage: 0
        }
      }
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        articleList: {
          ...state.articleList,
          pager: action.pager,
          articles: action.payload[1].articles,
          articlesCount: action.payload[1].articlesCount,
          currentPage: 0
        }
      };
    case PROFILE_PAGE_UNLOADED:
      return {
        ...state,
        profile: {}
      };
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {
        ...state,
        common: {
          ...state.common,
          viewChangeCounter: state.common.viewChangeCounter + 1
        },
        articleList: {},
      };

    /** AUTH reducer */
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: action.error ? null : '/',
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user
        },
        auth: {
          ...state.auth,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        }
      };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {
        ...state,
        common: {
          ...state.common,
          viewChangeCounter: state.common.viewChangeCounter + 1
        },
        auth: {},
      };
    // case ASYNC_START:
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          [action.key]: action.value
        }
      };

    /** COMMON reducer */
    case APP_LOAD:
      return {
        ...state,
        common: {
          ...state.common,
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        }
      };
    case REDIRECT:
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: null
        }
      };
    case LOGOUT:
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: '/',
          token: null,
          currentUser: null
        }
      };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: redirectUrl,
        },
        editor: {
          ...state.editor,
          inProgress: null,
          errors: action.error ? action.payload.errors : null
        }
       };
    case SETTINGS_SAVED:
      return {
        ...state,
        common: {
          ...state.common,
          redirectTo: action.error ? null : '/',
          currentUser: action.error ? null : action.payload.user
        },
        settings: {
          ...state.settings,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        }
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
    // case HOME_PAGE_UNLOADED:
    // case PROFILE_PAGE_UNLOADED:
    // case PROFILE_FAVORITES_PAGE_UNLOADED:
    // case LOGIN_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
      return {
        ...state,
        common: {
          ...state.common,
          viewChangeCounter: state.common.viewChangeCounter + 1
        },
        settings: {
          ...state.settings,
          inProgress: true
        }
      };

    /** EDITOR reducer */
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        editor: {
          ...state.editor,
          articleSlug: action.payload ? action.payload.article.slug : '',
          title: action.payload ? action.payload.article.title : '',
          description: action.payload ? action.payload.article.description : '',
          body: action.payload ? action.payload.article.body : '',
          tagInput: '',
          tagList: action.payload ? action.payload.article.tagList : []
        }
      };
    // case EDITOR_PAGE_UNLOADED:
    // case ARTICLE_SUBMITTED:
    // case ASYNC_START:
    case ADD_TAG:
      return {
        ...state,
        editor: {
          ...state.editor,
          tagList: state.editor.tagList.concat([state.editor.tagInput]),
          tagInput: ''
        }
      };
    case REMOVE_TAG:
      return {
        ...state,
        editor: {
          ...state.editor,
          tagList: state.editor.tagList.filter(tag => tag !== action.tag)
        }
      };
    case UPDATE_FIELD_EDITOR:
      return {
        ...state,
        editor: {
          ...state.editor,
          [action.key]: action.value
        }
      };

    /** HOME reducer */
    // case HOME_PAGE_LOADED:
    // case HOME_PAGE_UNLOADED:
    /** PROFILE reducer */
    // case PROFILE_PAGE_LOADED:
    // case PROFILE_PAGE_UNLOADED:
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: {
          ...action.payload.profile
        }
      };

    /** SETTINGS reducer */
    // case SETTINGS_SAVED:
    // case SETTINGS_PAGE_UNLOADED:
    // case ASYNC_START:

    case ASYNC_START:
      console.log('REDUCER:auth', action.type);
      let inProgressStates = {};
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        inProgressStates = {
          auth: {
            ...state.auth,
            inProgress: true
          }
        };
      }

      console.log('REDUCER:editor', action.type);
      if (action.subtype === ARTICLE_SUBMITTED) {
        inProgressStates = {
          editor: {
            ...state.editor,
            inProgress: true
          }
        };
      }

      console.log('REDUCER:settings', action.type);
      return {
        ...state,
        ...inProgressStates,
        settings: {
          ...state.settings,
          inProgress: true
        }
      };
    default:
      return state;
  }
}

function AppProvider({children}) {
  const [state, dispatch] = React.useReducer(appStateReducer, initailState);

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
