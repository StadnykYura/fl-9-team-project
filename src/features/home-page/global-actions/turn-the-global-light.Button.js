import React, { Component } from "react";
import { firebase } from "../../../firebase";

class TurnTheGlobalLightButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnAllLight: true,
      rooms: [],
      roomsAndDevices: [{}]
    };
  }

  getDevicesFromRooms = () => {
    const user = firebase.auth.currentUser;
    const roomsDocRef = firebase.db
      .collection("users")
      .doc(user.uid)
      .collection("rooms");
    let roomsAndDevices = [
      /*{
        name: '',
        turnOnOffLight: '',
        devices: {
          name: '',
          isOne: ''
        }
      }*/
    ];
    if (user) {
      roomsDocRef.get().then(documents => {
        documents.docs.forEach(document => {
          roomsDocRef
            .doc(document.id)
            .collection("devices")
            .get()
            .then(documents => {
              let roomData = document.data();
              let devices = [];
              documents.docs.forEach(document => {
                let deviceData = document.data();
                devices.push({
                  name: deviceData.name,
                  isOn: deviceData.isOn
                });
              });
              roomsAndDevices.push({
                name: roomData.name,
                turnOnOffLight: roomData.turnOnOffLight,
                devices: devices
              });
            });
          console.log(roomsAndDevices);
        });
      });
    } else {
      console.log("User didn`t sign in");
    }
  };

  getRoomsData = () => {
    const user = firebase.auth.currentUser;
    let rooms = [];
    if (user) {
      firebase.db
        .collection("users")
        .doc(user.uid)
        .collection("rooms")
        .get()
        .then(documents => {
          documents.docs.forEach(document => {
            rooms.push(document.data());
          });
          this.setState({
            rooms: rooms
          });
          console.log(this.state.rooms);
        });
    } else {
      console.log("User didn`t sign in");
    }
  };

  turnOffOnnLight = () => {
    const batch = firebase.db.batch();
    const user = firebase.auth.currentUser;
    if (user) {
      firebase.db
        .collection("users")
        .doc(user.uid)
        .collection("rooms")
        .get()
        .then(documents => {
          this.setState({
            turnAllLight: !this.state.turnAllLight
          });
          documents.docs.forEach(document => {
            const roomDocRef = firebase.db
              .collection("users")
              .doc(user.uid)
              .collection("rooms")
              .doc(document.id);
            batch.update(roomDocRef, {
              turnOnOffLight: this.state.turnAllLight
            });
          });
          batch.commit();
        });
    } else {
      console.log("User didn`t sign in");
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.turnOffOnnLight}>turn</button>
        <button onClick={this.getRoomsData}>get rooms data</button>
        <button onClick={this.getDevicesFromRooms}>get room devices</button>
      </div>
    );
  }
}

export default TurnTheGlobalLightButton;
