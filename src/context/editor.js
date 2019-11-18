import React, { createContext, useContext, useReducer } from 'react';
import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../actions/actionTypes';


const EditorStateContext = createContext();
const EditorDispatchContext = createContext();

const initialState = {
  articleSlug: '',
  title: '',
  description: '',
  body: '',
  tagInput: '',
  tagList: [],
  inProgress: null,
  errors: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : []
      }
    case EDITOR_PAGE_UNLOADED:
      return {
        ...initialState
      };
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    // case ASYNC_START:
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
};

function EditorProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
}

function useEditorState() {
  return useContext(EditorStateContext);
}

function useEditorDispatch() {
  return useContext(EditorDispatchContext);
}


export {
  EditorProvider,
  useEditorState,
  useEditorDispatch
};
