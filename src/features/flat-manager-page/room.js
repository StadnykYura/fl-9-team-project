import React, { Component } from 'react';
import Device from './device';
import { firebase } from '../../firebase';
import AuthUserContext from '../authorization/auth-user.context';
import { DropTarget } from 'react-dnd';
import dndTypes from '../../constants/dnd-types.constants';

const spec = {
  drop(props, monitor, component) {
    const device = monitor.getItem();
    const nextDevice = {
      id: device.id,
      roomId: props.id,
      name: device.deviceData.name,
      deviceSettings: device.deviceData.deviceSettings,
      isMutable: device.deviceData.isMutable,
      isOn: device.deviceData.isOn,
      url: device.deviceData.url,
    };

    // Delete
    firebase.db
      .collection('users')
      .doc(component.context.userUID)
      .collection('rooms')
      .doc(device.roomId)
      .collection('devices')
      .doc(device.id)
      .delete()
      .then(() => {
        device.onDeviceRemove(device.id);
      });
    // Add
    firebase.db
      .collection('users')
      .doc(component.context.userUID)
      .collection('rooms')
      .doc(props.id)
      .collection('devices')
      .doc(device.id)
      .set({
        name: nextDevice.name,
        deviceSettings: nextDevice.deviceSettings,
        isMutable: nextDevice.isMutable,
        isOn: nextDevice.isOn,
        url: nextDevice.url,
      })
      .then(() => {
        component.addDevice(nextDevice);
      });

    return nextDevice;
  },
  hover(props, monitor) {},
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
};
class Room extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      isLoading: false,
    };

    this.renderDevice = this.renderDevice.bind(this);
    this.updateDevices = this.updateDevices.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
  }

  updateDevices(devices) {
    this.setState({
      devices: devices,
    });
  }

  addDevice(device) {
    this.setState(prevState => {
      return {
        devices: [...prevState.devices, device],
      };
    });
  }

  removeDevice(deviceId) {
    this.setState(prevState => {
      return {
        devices: prevState.devices.filter(device => {
          return device.id !== deviceId;
        }),
      };
    });
  }

  fetchDevices() {
    return firebase.db
      .collection('users')
      .doc(this.context.userUID)
      .collection('rooms')
      .doc(this.props.id)
      .collection('devices')
      .get();
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchDevices().then(documents => {
      const devices = [];

      documents.forEach(document => {
        devices.push({
          ...document.data(),
          id: document.id,
        });
      });

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
        deviceData={device}
        roomId={this.props.id}
        onDeviceRemove={this.removeDevice}
        onDeviceAdd={this.addDevice}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return <p>Device loadin....</p>;
    }

    return this.props.connectDropTarget(
      <div
        // className={this.props.isOver ? 'startDrop' : 'stopDrop'}
        style={{
          background: this.props.isOver
            ? 'var(--hoverBG)'
            : 'var( --menu-border)',
        }}
        className="room"
      >
        <div className="name-room">
          <h3>{this.props.name}</h3>
        </div>
        <div className="devices">
          {this.state.devices.map(this.renderDevice)}
        </div>
      </div>
    );
  }
}
export default DropTarget(dndTypes.DEVICE, spec, collect)(Room);
