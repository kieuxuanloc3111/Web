// import logo from './logo.svg';
// import './App.css';
// function MyButton() {
//   return (
//     <button>I'm a button</button>
//   );
// }

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

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}