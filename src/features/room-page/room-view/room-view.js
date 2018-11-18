import React, { Component } from 'react';

// import Device from './device/device';
// import RangeInput from './range-input/range-input';
// import { firebase } from '../../../firebase';
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
          console.log(devicesData);
          this.setState({
            isDevicesLoading: false,
            devices: devicesData,
          });
        });
    }
  }

  selectDevice(deviceId) {
    if (
      this.state.isSettingsOpen &&
      this.state.selectedDevice.id === deviceId
    ) {
      this.setState({
        isSettingsOpen: false,
      });
    } else {
      this.setState({
        isSettingsLoading: true,
        isSettingsOpen: false,
      });
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
    }
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
              console.log(currentUpdatedDevice);
              this.setState({
                devices: devicesData,
                isTurnOffTogglerLoading: false,
                selectedDevice: currentUpdatedDevice,
              });
            });
        });
    }
  }

  handleMutableDataCurrentValueUpdate(value, device) {
    console.log('HANDLE MUTABLE', value);
    this.setState({
      isMutableDataIsLoading: true,
    });
    const uid = this.props.userUID;
    if (uid) {
      firestoreAPI
        .getDeviceRef(uid, this.props.room.id, device.id)
        .update({
          'mutableData.currentValue': value,
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
          {this.state.isSettingsOpen ? (
            <div className="room-view__device-settings">
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
            </div>
          ) : null}
          {this.state.isSettingsLoading && (
            <div className="room-view__device-settings">
              Loading/Updating Settings
            </div>
          )}
        </div>
      </div>
    );
  }
}

// export default class RoomView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSettingsOpen: false,
//       devicesData: [],
//       currentDeviceData: {},
//       isOn: null,
//     };
//     this.Auth = new AuthService();
//     this.handlerSettingsOpen = this.handlerSettingsOpen.bind(this);
//     this.handlerSettingsClose = this.handlerSettingsClose.bind(this);
//     this.handlerOnOffDevice = this.handlerOnOffDevice.bind(this);
//     this.changeMutableData = this.changeMutableData.bind(this);
//   }

//   componentDidMount() {
//     const uid = this.props.userUID;
//     const devicesData = [];
//     if (uid) {
//       firebase.db
//         .collection('users')
//         .doc(uid)
//         .collection('rooms')
//         .doc(this.props.room.id)
//         .collection('devices')
//         .get()
//         .then(documents => {
//           documents.forEach(document => {
//             devicesData.push({
//               id: document.id,
//               isOn: document.data().isOn,
//               name: document.data().name,
//               url: document.data().url,
//               isMutable: document.data().isMutable,
//             });

//             this.setState({
//               devicesData: devicesData,
//             });
//           });
//         });
//     }
//   }

//   handlerSettingsOpen(dataAboutDevice) {
//     // debugger;
//     const uid = this.props.userUID;
//     const deviceDocRef = firebase.db
//       .collection('users')
//       .doc(uid)
//       .collection('rooms')
//       .doc(this.props.room.id)
//       .collection('devices')
//       .doc(dataAboutDevice.id);
//     if (uid) {
//       this.getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef);
//     }
//   }

//   getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef) {

//     return new Promise((resolve, reject) => {
//       deviceDocRef.get().then(document => {
//         const updatedDevice = {
//           id: document.id,
//           name: document.data().name,
//           isOn: document.data().isOn,
//           isMutable: document.data().isMutable,
//           mutableData: document.data().isMutable
//             ? {
//               currentValue: document.data().mutableData.currentValue,
//               unit: document.data().mutableData.unit,
//               minValue: document.data().mutableData.minValue,
//               maxValue: document.data().mutableData.maxValue,
//               step: document.data().mutableData.step,
//               title: document.data().mutableData.title,
//             }
//             : null,
//         };
//         this.setState({
//           isSettingsOpen: true,
//           currentDeviceData: updatedDevice,
//           isOn: updatedDevice.isOn,
//         });
//         resolve(updatedDevice);
//       });
//     })
//   }

//   handlerSettingsClose() {
//     this.setState({
//       isSettingsOpen: false,
//     });
//   }

//   handlerOnOffDevice() {
//     const uid = this.props.userUID;
//     if (uid) {
//       firebase.db
//         .collection('users')
//         .doc(uid)
//         .collection('rooms')
//         .doc(this.props.room.id)
//         .collection('devices')
//         .doc(this.state.currentDeviceData.id)
//         .update({
//           isOn: !this.state.isOn,
//         })
//         .then(() => {
//           this.setState(prevState => ({
//             isOn: !prevState.isOn,
//           }));
//         });
//     }
//   }

//   changeMutableData(roomId, deviceId, newCurrentValue) {

//     return new Promise((resolve, reject) => {
//       const uid = this.props.userUID;
//       const deviceDocRef = firebase.db
//         .collection('users')
//         .doc(uid)
//         .collection('rooms')
//         .doc(roomId)
//         .collection('devices')
//         .doc(deviceId);
//       if (uid) {
//         deviceDocRef
//           .update({
//             'mutableData.currentValue': newCurrentValue,
//           })
//           .then(() => {
//             this.getUpdatedDeviceByFBDocRefWithStateUpdate(deviceDocRef)
//               .then((response) => {
//                 resolve(response);
//                 reject("Error");
//               });

//           });
//       }
//     });

//   }

//   render() {
//     const { isSettingsOpen, devicesData, currentDeviceData, isOn } = this.state;
//     return (
//       <div className="room-view-wrapper" >
//         <div className="room-title">
//           <h2>{this.props.room.name}</h2>
//         </div>
//         <div className="room-view">
//           <div className="room-view-devices">
//             {devicesData.map((device, index) => (
//               <Device
//                 deviceData={device}
//                 handlerSettingsOpen={this.handlerSettingsOpen}
//                 key={index}
//               />
//             ))}
//           </div>
//           <div
//             className={
//               isSettingsOpen
//                 ? 'room-view-device-settings active'
//                 : 'room-view-device-settings'
//             }
//           >
//             <div className="settings-close">
//               <button
//                 className="close-button"
//                 onClick={this.handlerSettingsClose}
//               />
//             </div>
//             <div className="settings-info">
//               device settings <hr />
//               name: {currentDeviceData.name} <hr />
//               <button
//                 onClick={this.handlerOnOffDevice}
//                 className={isOn ? 'turn_on' : 'turn_off'}
//               >
//                 <span>{isOn ? 'on' : 'off'}</span>
//                 <i className="switcher" />
//               </button>
//             </div>
//             {currentDeviceData.isMutable ? (
//               <div className="setting-range">
//                 <RangeInput
//                   userUID={this.props.userUID}
//                   roomID={this.props.room.id}
//                   device={currentDeviceData}
//                   handeSaveMutable={this.changeMutableData}
//                 />
//               </div>
//             ) : (
//                 ''
//               )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
