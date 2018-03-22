import React, { Component } from 'react';

//  My Components
import Game from './TickTackToe';
import MyNavbar from './MyNavbar';
import Footer from './Footer';

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

/**
 * Main App class
 */
class App extends Component {
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
          <Button bsStyle="danger" onClick={fireLasers}>
            Activate Lasers
          </Button>
          <br />
          {false}
          {true && "lala"}
          <Footer />
          <Game />
      </div>
    );
  }
}

export default App;
