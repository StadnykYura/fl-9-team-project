import React, { Component } from 'react';

class ShowTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }
  render() {
    return (
      <div className="App-clock">
        {this.state.time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    );
  }
}

export default ShowTime;
