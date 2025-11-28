import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Routes, BrowserRouter,Route, Router} from 'react-router-dom'
import Home from './Component/Home';
import Blog from './Component/Blog/Blog';
import Blog_detail from './Component/Blog/Blog_detail';
import Index from './Component/Member/Index';
import Login from './Component/Member/Login';
import Register from './Component/Member/Register';
import UpdateUser from './Component/Member/UpdateUser';
import AddProduct from './Component/Member/AddProduct';
import MyProduct from './Component/Member/MyProduct';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App>
        <Routes>
          <Route index path='/' element={<Home/>} />
          <Route index path='/blog' element={<Blog/>} />
          <Route path="/blog_detail/:id" element={<Blog_detail/>} />
          <Route path="/loginandregister" element={<Index/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/account/update" element={<UpdateUser/>} />
          <Route path="/account/product/add" element={<AddProduct/>} />
          <Route path="/account/product/list" element={<MyProduct/>} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
