import React from 'react';

import agent from '../agent';

import { APPLY_TAG_FILTER } from '../constants/actionTypes';
import { useAppState  } from '../context';
import { useArticleListDispatch } from '../context/articleList';


const Tags = () => {
  const appState = useAppState();
  const articleListDispatch = useArticleListDispatch();
  const { home:{ tags }} = appState;

  const onClickTag = (tag, pager, payload) => {
    articleListDispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  };

  if (tags.length === 0)
    return <div>Loading Tags...</div>;

  return (
    <div className="tag-list">
      {tags.map(tag => {
          const handleClick = async ev => {
            ev.preventDefault();
            onClickTag(tag, page => agent.Articles.byTag(tag, page), await agent.Articles.byTag(tag));
          };

          return (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}>
              {tag}
            </a>
          );
        })
      }
    </div>
  );
};


export default Tags;
