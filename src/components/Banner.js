import React, { Fragment } from 'react';
import ArticleMeta from './articles/ArticleMeta';


const AppName = ({ appName }) => {
  return (
    <Fragment>
      <h1 className="logo-font">
        {appName.toLowerCase()}
      </h1>
      <p>A place to share your knowledge.</p>
    </Fragment>
  );
};

const Banner = ({ appName, article }) => {
  return (
    <div className="banner">
      <div className="container">
      {appName
        ? <AppName appName={appName} />
        : <ArticleMeta article={article} />
      }
      </div>
    </div>
  );
};


export default Banner;
