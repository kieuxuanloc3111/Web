import logo from './logo.svg';
import './App.css';


import Header from "./component/Layout/Header";

import Home from "./Home";
import Login from "./component/Login";

import Demo from "./Demo";
import Footer from "./component/Layout/Footer";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//   );
// }

// export default App;



// function App(props) {
//   return (
//     <>
//       <Header/>
//       {props.children}
//       <Footer/>
//     </>
//   );
// }

// export default App;


import React from 'react';
import Vdu1 from './Bai11/Vdu1';
import Vdu2 from './Bai11/Vdu2';
import NumberList from './Bai12/ListComponent';
import TodoList from './Bai12/Key';
import { renderDataArr, renderDataObj } from "./Bai12/ArrayandObject";
import A from './Bai12/A';
import Test from './Bai13/Form';
import TestTextarea from './Bai13/Textarea';
import Select from './Bai13/Select';


function App() {
  const arr = ["Táo", "Cam", "Nho"];

  const obj = {
    a: "Laptop",
    b: "Keyboard",
    c: "Mouse"
  };

  return (
    <div>
      <A/>
    </div>
  );
}

export default App;

