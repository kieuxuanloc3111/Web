import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Demo from './Demo';
import {Routes, BrowserRouter,Route, Router} from 'react-router-dom'
import Home from './Home';
import Login from './component/Login';
import Account from './component/Account';

let name = " loclocloc";
let num = 10;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>

          <Route index path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account' element={<Account/>} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
