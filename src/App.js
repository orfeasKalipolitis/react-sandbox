import React, { Component } from 'react';

//  My Components
import Game from './TickTackToe';
import MyNavbar from './MyNavbar';
import Footer from './Footer';
import TempCalculator from './TempCalc';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

//  Assets
import logo from './logo.svg';
import laser from './laser.mp3';
import './App.css';

//---------------------- Imports done -------------------------------------//

function fireLasers () {
  var clip = new Audio(laser);
  clip.play();
}

class TestintComps extends Component {
  render() {
    return (
      <div>
        <br />
        <Button bsStyle="danger" onClick={fireLasers}>
          Activate Lasers
        </Button>
        <br />
        <Game />
        <br />
        <TempCalculator />
      </div>
    );
  }
}

/**
 * Main App class
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTests: false,  // Change this to true, in order to show random modules created throughout development
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MyNavbar />
        <br />
        <Footer />
        { this.state.checkTests && <TestintComps /> }
      </div>
    );
  }
}

export default App;
