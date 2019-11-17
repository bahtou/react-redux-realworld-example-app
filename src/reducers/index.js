import { combineReducers } from 'redux';

import article from './article';
import articleList from './articleList';
import editor from './editor';
import profile from './profile';
import shared from './shared';
import tagList from './tagList';
import user from './user';


export default combineReducers({
  article,
  articleList,
  editor,
  profile,
  shared,
  tagList,
  user
});
