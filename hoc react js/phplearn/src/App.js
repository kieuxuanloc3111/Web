import logo from './logo.svg';
import './App.css';
import Header from "./Component/Layout/Header";
import Footer from "./Component/Layout/Footer";
import MenuLeft from "./Component/Layout/MenuLeft";
function App(props) {
  return (
    <>
      <Header/>
        <section>
          <div className="container">
            <div className="row">
              <MenuLeft/>
              {props.children}
            </div>
          </div>
        </section>
      
      <Footer/>
    </>
  );
}

export default App;
