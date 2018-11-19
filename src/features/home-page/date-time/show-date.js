import React, { Component } from 'react';

class ShowDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString('en-En', {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
      }),
    };
  }

  render() {
    return <span className="data">{this.state.date}</span>;
  }
}

export default ShowDate;
