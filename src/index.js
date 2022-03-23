import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {DataContextProvider} from './context'


ReactDOM.render(
  <BrowserRouter>
    <DataContextProvider>
       <App />
    </DataContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
