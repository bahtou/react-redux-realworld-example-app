import React from 'react';


const HomeLayoutComponent = ({ children }) => {
  return (
    <div className="container page">
      <div className="row">
      {children}
      </div>
    </div>
  );
};

const UserLayoutComponent = ({ children }) => {
  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
        {children}
        </div>
      </div>
    </div>
  );
};

const EditorLayoutComponent = ({ children }) => {
  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          {children}
        </div>
      </div>
    </div>
  );
};

const SettingsLayoutComponent = ({ children }) => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {children}
          </div>
        </div>
      </div>
  </div>
  );
};


export {
  UserLayoutComponent,
  HomeLayoutComponent,
  EditorLayoutComponent,
  SettingsLayoutComponent
};
