import React, { Component } from 'react';

import * as roomsID from '../../../constants/roomsID';
import Device from './device/device';

import { firebase } from '../../../firebase';

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSettingsOpen: false,
      devicesData: [],
      currentDeviceData: {},
    };
    this.handlerSettingsOpen = this.handlerSettingsOpen.bind(this);
  }
  componentDidMount() {
    const user = firebase.auth.currentUser;
    const devicesData = [];
    if (user) {
      firebase.db
        .collection('users')
        .doc(user.uid)
        .collection('rooms')
        .doc(roomsID.KITCHEN_ID)
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
      <section className="room-view-wrapper">
        <div className="room-title">
          <h2>Kitchen</h2>
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
      </section>
    );
  }
}
