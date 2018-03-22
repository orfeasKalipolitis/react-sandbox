import React, { Component } from 'react';

import axios from 'axios';

class RonSwanson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sayings: [],
    };
    this.getSaying = this.getSaying.bind(this);
  }

  gotAnewOne(saying) {
    console.log(saying);
    let quotes = this.state.sayings.slice();
    quotes.push(saying);
    this.setState(() => ({
      sayings: quotes
    }));
  }

  getSaying() {
    let url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
    axios.get(url)
      .then(response => (this.gotAnewOne(response.data[0])))
  }

  render() {
    return (
      <div>
        Ron Swanson Quotes
        <br />
        <button onClick={this.getSaying}>I want more</button>
        <p>Quotes:</p>
        {this.state.sayings.map((saying) => (
          <li>
            {saying}
          </li>
        ))}
      </div>
    );
  }
}

export default RonSwanson;
