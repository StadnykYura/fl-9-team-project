import React, { Component } from 'react';
class Device extends Component {
  render() {
    return (
      <div className="device">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
export default Device;
