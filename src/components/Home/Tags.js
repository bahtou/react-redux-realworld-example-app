import React from 'react';
import agent from '../../agent';
import { useAppState  } from '../../context';


const Tags = ({ onClickTag }) => {
  const appState = useAppState();
  const { home:{ tags }} = appState;

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
