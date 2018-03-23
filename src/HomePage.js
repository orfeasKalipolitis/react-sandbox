import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

// My components
import UserPageCreator from './UserPageCreation';
import UserPage from './UserPage';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPages: [],
    };

    // binds
    this.cancelPageCreation = this.cancelPageCreation.bind(this);
    this.submitPageCreation = this.submitPageCreation.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
  }

  cancelPageCreation() {
    this.setState(() => ({creatingNewPage: false}));
  }

  submitPageCreation(pageName) {
    let newUP = this.state.userPages.slice();
    newUP.push({name: pageName});
    this.setState(() => ({
      userPages: newUP,
    }));
    this.props.doneCreatingPage();
  }

  pageClicked(page, e) {
    this.props.pageClicked(page, e)
    //  this.setState(() => ({userPage: page}));
    this.props.createBack();
  }

  render() {
    return (
      <div className="home">
        <div>
          { !this.props.creatingNewPage && !this.props.userPage ?
            <div>
              <span>
                <Button bsStyle="info">Settings</Button>
                <Button bsStyle="primary" onClick={this.props.createPagePage}>+</Button>
              </span>
              <div id="userPages">
                <h2><p>User Created Pages</p></h2>
                <div className="userPages">
                  <h3>
                    {this.state.userPages.map((page, index) => (
                      <p className="userPage" key={page.toString() + index} onClick={(e) => (this.props.pageClicked(page, e))}>{page.name}</p>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          : !this.props.userPage &&
            <div>
              <UserPageCreator submit={this.submitPageCreation} cancel={this.cancelPageCreation} />
            </div>
          }
        </div>
        { this.props.userPage &&
          <div className="specifiedPage">
            <UserPage />
          </div>
        }
      </div>
    );
  }
}

export default HomePage;
