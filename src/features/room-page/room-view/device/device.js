import React, { Component } from 'react';

export default class Device extends Component {
  render() {
    const { deviceData, onDeviceSelect } = this.props;
    return (
      <button
        className="device"
        onClick={() => {
          onDeviceSelect(this.props.deviceData.id);
        }}
      >
        <div className="device-info">
          <i className={`icon ${deviceData.url}`} />
          <p>{deviceData.name}</p>
        </div>
      </button>
    );
  }
}
