import React, { Component } from 'react';
import * as firestoreAPI from '../../../firebase/utils/firestoreAPI';

import DeviceList from './device-list';
import DeviceSettings from './device-settings';

export default class RoomView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: null,
      isDevicesLoading: false,
      isSettingsOpen: false,
      isSettingsLoading: false,
      selectedDevice: null,
      isTurnOffTogglerLoading: false,
      isMutableDataIsLoading: false,
    };

    this.selectDevice = this.selectDevice.bind(this);
    this.turnOnOffDevice = this.turnOnOffDevice.bind(this);
    this.handleSettingsClose = this.handleSettingsClose.bind(this);
    this.handleMutableDataCurrentValueUpdate = this.handleMutableDataCurrentValueUpdate.bind(
      this
    );
  }

  componentDidMount() {
    this.setState({
      isDevicesLoading: true,
    });
    const uid = this.props.userUID;
    const devicesData = [];
    if (uid) {
      firestoreAPI
        .getAllDevicesDataForRoom(uid, this.props.room.id)
        .then(documents => {
          documents.forEach(document => {
            devicesData.push({
              id: document.id,
              ...document.data(),
            });
          });
          this.setState({
            isDevicesLoading: false,
            devices: devicesData,
          });
        });
    }
  }

  selectDevice(deviceId) {
    const uid = this.props.userUID;
    if (uid) {
      firestoreAPI
        .getDeviceDataFromRoom(uid, this.props.room.id, deviceId)
        .then(document => {
          const selectedDeviceFromDB = {
            id: document.id,
            ...document.data(),
          };
          console.log(selectedDeviceFromDB);
          this.setState({
            isSettingsLoading: false,
            isSettingsOpen: true,
            selectedDevice: selectedDeviceFromDB,
          });
        });
    }
    // if (
    //   this.state.isSettingsOpen &&
    //   this.state.selectedDevice.id === deviceId
    // ) {
    //   this.setState({
    //     isSettingsOpen: false,
    //   });
    // } else {
    //   this.setState({
    //     isSettingsLoading: true,
    //     isSettingsOpen: false,
    //   });
    //   const uid = this.props.userUID;
    //   if (uid) {
    //     firestoreAPI
    //       .getDeviceDataFromRoom(uid, this.props.room.id, deviceId)
    //       .then(document => {
    //         const selectedDeviceFromDB = {
    //           id: document.id,
    //           ...document.data(),
    //         };
    //         console.log(selectedDeviceFromDB);
    //         this.setState({
    //           isSettingsLoading: false,
    //           isSettingsOpen: true,
    //           selectedDevice: selectedDeviceFromDB,
    //         });
    //       });
    //   }
    // }
  }

  turnOnOffDevice(device) {
    this.setState({
      isTurnOffTogglerLoading: true,
    });
    const uid = this.props.userUID;
    if (uid) {
      firestoreAPI
        .getDeviceRef(uid, this.props.room.id, device.id)
        .update({
          isOn: !device.isOn,
        })
        .then(() => {
          const devicesData = [];
          firestoreAPI
            .getAllDevicesDataForRoom(uid, this.props.room.id)
            .then(documents => {
              documents.forEach(document => {
                devicesData.push({
                  id: document.id,
                  ...document.data(),
                });
              });
              const currentUpdatedDevice = devicesData.find(
                el => el.id === device.id
              );
              this.setState({
                devices: devicesData,
                isTurnOffTogglerLoading: false,
                selectedDevice: currentUpdatedDevice,
              });
            });
        });
    }
  }

  handleMutableDataCurrentValueUpdate(value, device, currentSetting) {
    this.setState({
      isMutableDataIsLoading: true,
    });
    const uid = this.props.userUID;
    if (uid) {
      firestoreAPI
        .getDeviceRef(uid, this.props.room.id, device.id)
        .update({
          [`deviceSettings.${currentSetting.id}.config.currentValue`]: value,
        })
        .then(() => {
          const devicesData = [];
          firestoreAPI
            .getAllDevicesDataForRoom(uid, this.props.room.id)
            .then(documents => {
              documents.forEach(document => {
                devicesData.push({
                  id: document.id,
                  ...document.data(),
                });
              });
              const currentUpdatedDevice = devicesData.find(
                el => el.id === device.id
              );
              this.setState({
                devices: devicesData,
                selectedDevice: currentUpdatedDevice,
                isMutableDataIsLoading: false,
              });
            });
        });
    }
  }

  handleSettingsClose() {
    this.setState({
      isSettingsOpen: false,
    });
  }

  render() {
    return (
      <div className="room-view-wrapper">
        <div className="room-title">
          <h2>{this.props.room.name}</h2>
        </div>
        <div className="room-view">
          {this.state.devices && (
            <div className="room-view-devices">
              <DeviceList
                devices={this.state.devices}
                onDeviceSelect={this.selectDevice}
              />
            </div>
          )}
          <div
            className={
              this.state.isSettingsOpen
                ? 'room-view__device-settings active'
                : 'room-view__device-settings not-active'
            }
          >
            {this.state.isSettingsLoading || !this.state.selectedDevice ? (
              <div className="room-view__device-settings">
                Loading/Updating Settings
              </div>
            ) : (
              <DeviceSettings
                isTurnOffTogglerLoading={this.state.isTurnOffTogglerLoading}
                isMutableDataIsLoading={this.state.isMutableDataIsLoading}
                title={'Device settings'}
                isOpen={this.state.isSettingsOpen}
                onDeviceOnOff={this.turnOnOffDevice}
                currentDevice={this.state.selectedDevice}
                handleSettingsClose={this.handleSettingsClose}
                handleMutableDataCurrentValueUpdate={
                  this.handleMutableDataCurrentValueUpdate
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
