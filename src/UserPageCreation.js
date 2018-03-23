import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

class UserPageCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSuccess(e) {
    e.preventDefault();
    this.props.submit(this.state.name);
  }

  handleChange(e) {
    this.setState({name: e.target.value}); 
  }

  render() {
    return (
      <div className="userPageCreator">
        <form onSubmit={this.handleSuccess}>
          <label>
            Page name: 
            <input autoFocus={true} type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Button bsStyle="danger" onClick={this.props.cancel}>Cancel</Button>
      </div>
    );
  }
}

export default UserPageCreator;