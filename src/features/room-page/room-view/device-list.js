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
            isActive={
              this.props.currentActiveDevice !== null &&
              device.id === this.props.currentActiveDevice.id
                ? true
                : false
            }
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}
