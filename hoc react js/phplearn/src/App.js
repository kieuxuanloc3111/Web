import logo from './logo.svg';
import './App.css';
import Header from "./Component/Layout/Header";
import Footer from "./Component/Layout/Footer";
import MenuLeft from "./Component/Layout/MenuLeft";
import { useLocation } from 'react-router-dom';
import MenuAcc from './Component/Layout/MenuAcc';
function App(props) {
  let params1= useLocation();
  return (
    <>
      <Header/>
        <section>
          <div className="container">
            <div className="row">
          
              {params1['pathname'].includes("account") ? <MenuAcc/> : <MenuLeft/>};
              {props.children};
            </div>
          </div>
        </section>
      
      <Footer/>
    </>
  );
}

export default App;
