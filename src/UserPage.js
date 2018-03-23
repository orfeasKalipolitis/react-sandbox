import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingSubPage: false,
      manipulatingPage: false,
      newPageName: '',
      name: ''
    };
    
    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.submitNameChange = this.submitNameChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }
  
  handleNameChange(e) {
    this.setState({newPageName: e.target.value});
  }

  handleCreation(e) {
    e.preventDefault();
    this.props.newSubPage(this.state.name);
    this.setState({
      name: '',
      creatingSubPage: false,
      manipulatingPage: false
    });
  }

  submitNameChange(e) {
    e.preventDefault();
    this.props.changePageName(this.state.newPageName);
    this.cancel();
  }

  cancel() {
    this.setState({
      name: '',
      creatingSubPage: false,
      manipulatingPage: false
    });
  }

  render() {
    return (
      <div className="UserPageContainer">
        { !this.state.creatingSubPage && !this.state.manipulatingPage ?
          <div>
            <br />
            <Button className="holySpirit" bsStyle="info" onClick={() => (this.setState({manipulatingPage: true}))}>Settings</Button>
            <Button bsStyle="success" onClick={() => (this.setState({creatingSubPage: true}))}>Add subpage</Button>
            <br />
            <h2><p>{this.props.userPage.name}</p></h2>
            { this.props.userPage.subpages !== undefined && this.props.userPage.subpages.map((page, index) => (
              <p key={page.toString() + index}>{page.name}</p>
            )) }
          </div>
          :  !this.state.manipulatingPage &&
          <div>
            <form onSubmit={this.handleCreation}>
              <label>
                Page name: 
                <input autoFocus={true} type="text" value={this.state.name} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Button bsStyle="info" onClick={this.cancel}>Cancel</Button>
          </div>
        }
        { this.state.manipulatingPage &&
          <div>
          <form onSubmit={this.submitNameChange}>
              <label>
                Page name: 
                <input autoFocus={true} type="text" value={this.state.newPageName} onChange={this.handleNameChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Button className="holySpirit" bsStyle="info" onClick={this.cancel}>Cancel</Button>
            <br />
            <Button bsStyle="danger" onClick={this.props.deletePage}>Delete Page</Button>
          </div>
        }
      </div>
    );
  }
}

export default UserPage;
