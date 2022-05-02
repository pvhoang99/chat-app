import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Home from './component/Home';
import Register from './component/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/oauth2/redirect' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='register' element={<Register />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
