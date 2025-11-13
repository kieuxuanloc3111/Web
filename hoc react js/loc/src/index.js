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
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import Vdu1 from './Bai11/Vdu1';

let name = " loclocloc";
let num = 10;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
{/* 
          <Route index path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/> */}
          <Route path='/bai11/vidu1' element={<Vdu1 />}/>
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
