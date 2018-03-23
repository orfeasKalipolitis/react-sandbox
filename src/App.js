import React, { Component } from 'react';

//  My Components
import Game from './TickTackToe';
import MyNavbar from './MyNavbar';
import Footer from './Footer';
import TempCalculator from './TempCalc';
import RonSwanson from './RonSwanson';
import HomePage from './HomePage';

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

class TestingComps extends Component {
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
        <br />
        <RonSwanson />
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
      needBack: false,
      userPage: null,
      creatingNewPage: false,
    }

    // bidnings
    this.backButtonHandler = this.backButtonHandler.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
    this.createPagePage = this.createPagePage.bind(this);
    this.doneCreatingPage = this.doneCreatingPage.bind(this);
  }
  
  createPagePage() {
    this.setState(() => ({creatingNewPage: true}));
  }

  backButtonHandler(need) {
    this.setState(() => ({
      needBack: need
    }));
    // Back or Home pressed
    if (!need) {
      this.setState(() => ({
        creatingNewPage: false,
        userPage: null
      }));
    }
  }

  pageClicked(page, e) {
    this.setState(() => ({userPage: page}));
    this.backButtonHandler(true);
  }

  doneCreatingPage() {
    this.setState(() => ({creatingNewPage: false}));
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        { this.state.checkTests && 
          <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
        }
        <MyNavbar needBack={this.state.needBack} goBack={() => (this.backButtonHandler(false))} />
        <br />
        <HomePage doneCreatingPage={this.doneCreatingPage} createPagePage={this.createPagePage} pageClicked={this.pageClicked} userPage={this.state.userPage} creatingNewPage={this.state.creatingNewPage} createBack={() => (this.backButtonHandler(true))} />
        <br />
        <Footer />
        { this.state.checkTests && <TestingComps /> }
      </div>
    );
  }
}

export default App;
