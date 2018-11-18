import React, { Component } from 'react';

import Device from './device/device';

export default class DeviceList extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.devices.map((device, index) => (
          <Device
            deviceData={device}
            onDeviceSelect={this.props.onDeviceSelect}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}
