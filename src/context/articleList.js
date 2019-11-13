import React, { createContext, useContext, useReducer } from 'react';
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
} from '../constants/actionTypes';


const ArticleListStateContext = createContext();
const ArticleListDispatchContext = createContext();

const initialState = {
  tags: [],
  articles: [],
  articleCount: 0,
  currentPage: 0,
  tab: 'all',
  tag: null,
  pager: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            };
          }

          return article;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.payload.pager,
        tags: action.payload.tags,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0,
        tab: action.payload.tab
      };
    case HOME_PAGE_UNLOADED:
      return {
        ...initialState
      };
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0
      };
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0
      };
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

function ArticleListProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleListStateContext.Provider value={state}>
      <ArticleListDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListDispatchContext.Provider>
    </ArticleListStateContext.Provider>
  );
}

function useArticleListState() {
  return useContext(ArticleListStateContext);
}

function useArticleListDispatch() {
  return useContext(ArticleListDispatchContext);
}


export {
  ArticleListProvider,
  useArticleListState,
  useArticleListDispatch
};
