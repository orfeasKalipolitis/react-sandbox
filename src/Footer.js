import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <div className="MyFooter" onClick={() => alert('roar')}>
        I am a footer, hear my roar
      </div>
    );
  }
}

export default Footer;
