import React, { useState }  from "react";
import Button from 'react-bootstrap/Button'
import Checkers from "./components/game/Checkers";
import PortfolioShowCase from "./components/portfolios/PortfolioShowCase"; 
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>Portfolio Stuff...</div>
        <div><PortfolioShowCase/></div>
        <div class="checkers_modal">
        <Button  onClick={openModal}>Modal Button</Button>
        </div>
        <Checkers showModal={showModal} setShowModal={setShowModal} />
      </header>
    </div>
  );
}

export default App;
