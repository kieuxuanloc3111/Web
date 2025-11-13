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


import { useState } from 'react';
import Greeting from './Bai11/Greeting';

function App(props) {
  const [isTrue, setIsTrue] = useState(true);

  const toggleGreeting = () => {
    setIsTrue(!isTrue);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Nút để đổi giá trị xx */}
      <button onClick={toggleGreeting}>
        Đổi trạng thái (hiện đang là {isTrue ? 'True' : 'False'})
      </button>

      {/* Gọi component Greeting và truyền prop xx */}
      <Greeting xx={isTrue} />

      {/* Hiển thị nội dung các route con (Home, Login, Vdu1...) */}
      {props.children}
    </div>
  );
}

export default App;
// mo bai 13 co bat loi 2 cai Selection, textarea