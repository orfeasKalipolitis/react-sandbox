import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingSubPage: false,
      name: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  handleCreation(e) {
    e.preventDefault();
    this.props.newSubPage(this.state.name);
    this.setState({
      name: '',
      creatingSubPage: false
    });
  }

  render() {
    return (
      <div className="UserPageContainer">
        { !this.state.creatingSubPage ?
          <div>
            <br />
            <Button bsStyle="info">Settings</Button>
            <Button bsStyle="success" onClick={() => (this.setState({creatingSubPage: true}))}>Add subpage</Button>
            <br />
            <h2><p>{this.props.userPage.name}</p></h2>
            { this.props.userPage.subpages !== undefined && this.props.userPage.subpages.map((page, index) => (
              <p key={page.toString() + index}>{page.name}</p>
            )) }
          </div>
          :
          <div>
            <form onSubmit={this.handleCreation}>
              <label>
                Page name: 
                <input autoFocus={true} type="text" value={this.state.name} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Button bsStyle="danger" onClick={this.props.cancel}>Cancel</Button>
          </div>
        }
      </div>
    );
  }
}

export default UserPage;
