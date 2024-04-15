import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Provider from './context';
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
