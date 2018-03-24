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
      name: '',
      focusPost: null,
      newPostPageName: ''
    };
    
    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.submitNameChange = this.submitNameChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handlePostNameChange = this.handlePostNameChange.bind(this);
    this.submitPostNameChange = this.submitPostNameChange.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }
  
  handleNameChange(e) {
    this.setState({newPageName: e.target.value});
  }

  handlePostNameChange(e) {
    this.setState({newPostPageName: e.target.value});
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

  submitPostNameChange(e) {
    e.preventDefault();
    let userPage = Object.assign({}, this.props.userPage);
    let index = userPage.subpages.indexOf(this.state.focusPost);
    userPage.subpages[index].name = this.state.newPostPageName;
    this.props.updateUserPage(userPage);
    this.cancel();
  }

  deletePost() {
    let userPage = Object.assign({}, this.props.userPage);
    let index = userPage.subpages.indexOf(this.state.focusPost);

    delete userPage.subpages[index];
    this.props.updateUserPage(userPage);
    this.cancel();
  }

  cancel() {
    this.setState({
      name: '',
      creatingSubPage: false,
      manipulatingPage: false,
      focusPost: null,
      newPostPageName: ''
    });
  }

  render() {
    return (
      <div className="UserPageContainer">
        { !this.state.creatingSubPage && !this.state.manipulatingPage && !this.state.focusPost ?
          <div>
            <br />
            <Button className="holySpirit" bsStyle="info" onClick={() => (this.setState({manipulatingPage: true}))}>Settings</Button>
            <Button bsStyle="success" onClick={() => (this.setState({creatingSubPage: true}))}>Add subpage</Button>
            <br />
            <h2><p>{this.props.userPage.name}</p></h2>
            { this.props.userPage.subpages !== undefined && this.props.userPage.subpages.map((page, index) => (
              <p className="userPost" onClick={() => (this.setState({focusPost: page}))} key={page.toString() + index}>{page.name}</p>
            )) }
          </div>
          :  !this.state.manipulatingPage && !this.state.focusPost &&
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
        { this.state.manipulatingPage && !this.state.focusPost &&
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
        { this.state.focusPost && 
          <div>
            <h2><p>{this.state.focusPost.name}</p></h2>
            <form onSubmit={this.submitPostNameChange}>
              <label>
                Post name: 
                <input autoFocus={true} type="text" value={this.state.newPostPageName} onChange={this.handlePostNameChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Button className="holySpirit" bsStyle="info" onClick={this.cancel}>Cancel</Button>
            <br />
            <Button bsStyle="danger" onClick={this.deletePost}>Delete Post</Button>
          </div>
        }
      </div>
    );
  }
}

export default UserPage;
