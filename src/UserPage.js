import React, { Component } from 'react';

//  Bootstrap imports
import { Button } from 'react-bootstrap';

class UserPage extends Component {
  render() {
    return (
      <div className="UserPageContainer">
        <Button bsStyle="success">I'm Cool</Button>
      </div>
    );
  }
}

export default UserPage;
