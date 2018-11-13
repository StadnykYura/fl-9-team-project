import React, { Component } from 'react';

export default class Device extends Component {
  render() {
    const { deviceData, handlerSettingsOpen } = this.props;
    return (
      <button
        className="device"
        onClick={() => {
          handlerSettingsOpen(this.props.deviceData);
        }}
      >
        {deviceData.name}
      </button>
    );
  }
}
