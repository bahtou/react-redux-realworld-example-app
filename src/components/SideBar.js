import React from 'react';
import Tags from './Tags';


const SideBar = () => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <Tags />
      </div>
    </div>
  );
};


export default SideBar;
