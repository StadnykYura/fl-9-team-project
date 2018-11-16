import React, { Component } from 'react';

class ShowDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString('en-En', {
        day: 'numeric',
        month: 'short',
        weekday: 'long',
      }),
    };
  }

  render() {
    return <div className="Data">{this.state.date}</div>;
  }
}

export default ShowDate;
