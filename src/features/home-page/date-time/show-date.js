import React, { Component } from 'react';

class ShowDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString(),
    };
  }
  render() {
    return <div className="Data">{this.state.date}</div>;
  }
}

export default ShowDate;
