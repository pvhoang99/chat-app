import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/oauth2/redirect' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
