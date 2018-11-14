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
      isOn: null,
    };
    this.Auth = new AuthService();
    this.handlerSettingsOpen = this.handlerSettingsOpen.bind(this);
    this.handlerSettingsClose = this.handlerSettingsClose.bind(this);
    this.handlerOnOffDevice = this.handlerOnOffDevice.bind(this);
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
            devicesData.push({
              id: document.id,
              isOn: document.data().isOn,
              name: document.data().name,
            });
          });
          this.setState({
            devicesData: devicesData,
          });
        });
    }
  }
  handlerSettingsOpen(dataAboutDevice) {
    this.setState({
      isSettingsOpen: true,
      currentDeviceData: dataAboutDevice,
      isOn: dataAboutDevice.isOn,
    });
  }

  handlerSettingsClose() {
    this.setState({
      isSettingsOpen: false,
    });
  }
  handlerOnOffDevice() {
    const uid = this.props.userUID;
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .doc(this.props.room.id)
        .collection('devices')
        .doc(this.state.currentDeviceData.id)
        .update({
          isOn: !this.state.isOn,
        })
        .then(() => {
          this.setState(prevState => ({
            isOn: !prevState.isOn,
          }));
        });
    }
  }

  render() {
    const { isSettingsOpen, devicesData, currentDeviceData, isOn } = this.state;

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
          <div
            className={
              isSettingsOpen
                ? 'room-view-device-settings active'
                : 'room-view-device-settings'
            }
          >
            <div className="settings-close">
              <button
                className="close-button"
                onClick={this.handlerSettingsClose}
              />
            </div>
            <div className="settings-info">
              device settings <hr />
              name: {currentDeviceData.name} <hr />
              <button
                onClick={this.handlerOnOffDevice}
                className={isOn ? 'turn_on' : 'turn_off'}
              >
                <span>{isOn ? 'on' : 'off'}</span>
                <i className="switcher" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
