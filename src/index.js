import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from './context';
import { CommonProvider } from './context/common';
import App from './components/App';


ReactDOM.render((
  <BrowserRouter>
    <CommonProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CommonProvider>
  </BrowserRouter>

), document.getElementById('root'));
