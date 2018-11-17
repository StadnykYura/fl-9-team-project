import React, { Component } from 'react';

import Device from './device/device';
import RangeInput from './range-input/range-input';
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
    this.changeMutableData = this.changeMutableData.bind(this);
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
              url: document.data().url,
              isMutable: document.data().isMutable,
            });

            this.setState({
              devicesData: devicesData,
            });
          });
        });
    }
  }

  handlerSettingsOpen(dataAboutDevice) {
    // debugger;
    const uid = this.props.userUID;
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(this.props.room.id)
      .collection('devices')
      .doc(dataAboutDevice.id);
    if (uid) {
      this.getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef);
    }
  }

  getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef) {
    deviceDocRef.get().then(document => {
      const updatedDevice = {
        id: document.id,
        name: document.data().name,
        isOn: document.data().isOn,
        isMutable: document.data().isMutable,
        mutableData: document.data().isMutable
          ? {
              currentValue: document.data().mutableData.currentValue,
              unit: document.data().mutableData.unit,
              minValue: document.data().mutableData.minValue,
              maxValue: document.data().mutableData.maxValue,
              step: document.data().mutableData.step,
              title: document.data().mutableData.title,
            }
          : null,
      };
      this.setState({
        isSettingsOpen: true,
        currentDeviceData: updatedDevice,
        isOn: updatedDevice.isOn,
      });
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

  changeMutableData(roomId, deviceId, newCurrentValue) {
    const uid = this.props.userUID;
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(roomId)
      .collection('devices')
      .doc(deviceId);
    if (uid) {
      deviceDocRef
        .update({
          'mutableData.currentValue': newCurrentValue,
        })
        .then(() => {
          this.getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef);
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
            {currentDeviceData.isMutable ? (
              <div className="setting-range">
                <RangeInput
                  userUID={this.props.userUID}
                  roomID={this.props.room.id}
                  device={currentDeviceData}
                  handeSaveMutable={this.changeMutableData}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
