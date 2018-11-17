import React, { Component } from 'react';
import Device from './device';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      isLoading: false,
    };

    this.renderDevice = this.renderDevice.bind(this);
  }

  updateDevices(devices) {
    this.setState({
      devices: devices,
    });
  }

  addDevice(device) {
    this.setState(prevState => {
      return {
        devices: [...prevState.device, device],
      };
    });
  }

  removeDevice(deviceId) {
    this.setState(prevState => {
      return {
        devices: prevState.devices.filter(device => device.id !== deviceId),
      };
    });
  }

  fetchDevices() {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve([{ id: 1, name: 'Blender' }, { id: 2, name: 'Mixer' }]),
        2000
      );
    });
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchDevices().then(devices => {
      this.updateDevices(devices);

      this.setState({ isLoading: false });
    });
  }

  renderDevice(device) {
    return (
      <Device
        key={device.id}
        id={device.id}
        name={device.name}
        roomId={this.props.id}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return <p>Device loadin....</p>;
    }
    return (
      <div className="room">
        <h3>{this.props.name}</h3>
        <div className="devices">
          {this.state.devices.map(this.renderDevice)}
        </div>
      </div>
    );
  }
}
export default Room;
