import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

// My components
import UserPageCreator from './UserPageCreation';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPage: false,
      creatingNewPage: false,
      userPages: [],
    };

    // binds
    this.createPagePage = this.createPagePage.bind(this);
    this.cancelPageCreation = this.cancelPageCreation.bind(this);
    this.submitPageCreation = this.submitPageCreation.bind(this);
  }

  createPagePage() {
    this.setState(() => ({creatingNewPage: true}));
  }

  cancelPageCreation() {
    this.setState(() => ({creatingNewPage: false}));
  }

  submitPageCreation(pageName) {
    let newUP = this.state.userPages.slice();
    newUP.push({name: pageName});
    this.setState(() => ({
      creatingNewPage: false,
      userPages: newUP,
    }));
  }

  render() {
    return (
      <div className="home">
        <div>
          { !this.state.creatingNewPage ?
            <div>
              <span>
                <Button bsStyle="info">Settings</Button>
                <Button bsStyle="primary" onClick={this.createPagePage}>+</Button>
              </span>
              <div id="userPages">
                <h2><p>User Created Pages</p></h2>
                <div className="userPages">
                  <h3>
                    {this.state.userPages.map((page, index) => (
                      <p className="userPage" key={page.toString() + index}>{page.name}</p>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          :
            <div>
              <UserPageCreator submit={this.submitPageCreation} cancel={this.cancelPageCreation} />
            </div>
          }
        </div>
        <div>
          {/*<pagedetails page="clickedPage"></pagedetails>*/}
        </div>
      </div>
    );
  }
}

export default HomePage;
