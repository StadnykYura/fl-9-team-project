import React, { Component } from 'react';

import Device from './device/device';
import AuthService from '../../authorization/auth-service';
import { firebase } from '../../../firebase';

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSettingsOpen: false,
      devicesData: [],
      currentDeviceData: {},
    };

    this.Auth = new AuthService();
    this.handlerSettingsOpen = this.handlerSettingsOpen.bind(this);
  }
  componentDidMount() {
    const uid = this.props.userUID;
    const devicesData = [];
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .doc(this.props.room.id)
        .collection('devices')
        .get()
        .then(documents => {
          documents.forEach(document => {
            devicesData.push(document.data());
          });
          this.setState({
            devicesData: devicesData,
          });
        });
    } else {
      console.log('user didn`t logged');
    }
  }
  handlerSettingsOpen(dataAboutDevice) {
    this.setState(prevState => ({
      isSettingsOpen: !prevState.isSettingsOpen,
    }));
    this.setState({
      currentDeviceData: dataAboutDevice,
    });
  }

  render() {
    const { isSettingsOpen, devicesData, currentDeviceData } = this.state;
    return (
      <div className="room-view-wrapper">
        <div className="room-title">
          <h2>{this.props.room.name}</h2>
        </div>
        <div className="room-view">
          <div className="room-view-devices">
            {devicesData.map((device, index) => (
              <Device
                deviceData={device}
                handlerSettingsOpen={this.handlerSettingsOpen}
                key={index}
              />
            ))}
          </div>
          {isSettingsOpen ? (
            <div className="room-view-device-settings active">
              <div className="settings-info">
                device settings <hr />
                name: {currentDeviceData.name} <hr />
                isOn: {currentDeviceData.isOn ? 'yes' : 'no'}
              </div>
            </div>
          ) : (
            <div className="room-view-device-settings not-active">
              device settings
            </div>
          )}
        </div>
      </div>
    );
  }
}
