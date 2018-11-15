import React, { Component } from 'react';

class ShowTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }

  render() {
    return <div className="App-clock">{this.state.time}</div>;
  }
}

export default ShowTime;
