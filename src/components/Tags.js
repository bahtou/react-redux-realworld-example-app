import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../agent';

import { APPLY_TAG_FILTER } from '../constants/actionTypes';


const Tags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.tagList);

  const onClickTag = (tag, pager, payload) => {
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
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
