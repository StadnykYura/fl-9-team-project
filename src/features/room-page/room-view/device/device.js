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
        <div className="device-info">
          <img src={deviceData.url} alt="device" />
          <p>{deviceData.name}</p>
        </div>
      </button>
    );
  }
}
