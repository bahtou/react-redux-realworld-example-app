import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from './context';
import App from './components/App';


ReactDOM.render((
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>

), document.getElementById('root'));
