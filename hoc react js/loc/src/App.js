// import logo from './logo.svg';
// import './App.css';


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



function App(props) {
  return (
    <>
      <Header/>
      {props.children}
      <Footer/>
    </>
  );
}

export default App;