// import logo from './logo.svg';
// import './App.css';
// function MyButton() {
//   return (
//     <button>I'm a button</button>
//   );
// }

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

let text ="Xin chào từ App cha!" ;

function App() {
  return (
    <div>
      <h2>Ví dụ về Props</h2>
      <Demo zz={text}/>
    </div>
  );
}

export default App;