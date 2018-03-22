import React, { Component } from 'react';

class MyClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),  //  function
      1000                //  timeout
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(() => ({
      date: new Date(),
    }));
  }
  
  render() {
    return (
      <div className="time">
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

export default MyClock;
