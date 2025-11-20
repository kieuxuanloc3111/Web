import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Routes, BrowserRouter,Route, Router} from 'react-router-dom'
import Home from './Component/Home';
import Blog from './Component/Blog';
import Blog_detail from './Component/Blog_detail';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App>
        <Routes>
          <Route index path='/' element={<Home/>} />
          <Route index path='/blog' element={<Blog/>} />
          <Route path="/blog_detail" element={<Blog_detail />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
