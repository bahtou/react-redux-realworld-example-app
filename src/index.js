import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from './context';
import { CommonProvider } from './context/common';
import Routes from './Routes';


ReactDOM.render((
  <BrowserRouter>
    <CommonProvider>
      <AppProvider>
        <Routes/>
      </AppProvider>
    </CommonProvider>
  </BrowserRouter>
), document.getElementById('root'));
