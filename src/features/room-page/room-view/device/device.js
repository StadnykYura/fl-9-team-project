import React, { Component } from 'react';

export default class Device extends Component {
  render() {
    const { deviceData, onDeviceSelect, isActive } = this.props;
    return (
      <button
        className="device"
        onClick={() => {
          onDeviceSelect(this.props.deviceData.id);
        }}
      >
        <div className="device-info" title="Click on device to open settings">
          <i
            className={`${deviceData.url} ${
              isActive ? 'icon-active' : 'icon-default'
            }`}
          />
          <p>{deviceData.name}</p>
        </div>
      </button>
    );
  }
}
