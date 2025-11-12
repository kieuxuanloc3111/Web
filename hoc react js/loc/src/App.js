// import logo from './logo.svg';
// import './App.css';


import Header from "./component/Header";

import Home from "./Home";
import Login from "./component/Login";
import Phandau from "./component/Phandau";
import Demo from "./Demo";

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
//     </div>
//       // <div> 
//       //   <h1>xu ly form</h1>
//       //   <h1>xu ly form</h1>
//       //       <div>
//       //         <p class="err1">ggggg</p> 
//       //         <MyButton />
//       //       </div>
//       // </div>
      
//   );
// }

// export default App;



function App(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;