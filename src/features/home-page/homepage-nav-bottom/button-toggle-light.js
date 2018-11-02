import React, { Component } from "react";
import { firebase } from "../../../firebase";

class ToggleLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnOnOffLight: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const batch = firebase.db.batch();
    const user = firebase.auth.currentUser;
    if (user) {
      firebase.db
        .collection("users")
        .doc(user.uid)
        .collection("rooms")
        .get()
        .then(documents => {
          documents.docs.forEach(document => {
            const roomDocRef = firebase.db
              .collection("users")
              .doc(user.uid)
              .collection("rooms")
              .doc(document.id);
            batch.update(roomDocRef, {
              turnOnOffLight: this.state.turnOnOffLight
            });
          });
          batch.commit();
          this.setState({
            turnOnOffLight: !this.state.turnOnOffLight
          });
        });
    } else {
      console.log("User didn`t sign in");
    }
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={
          this.state.turnOnOffLight
            ? "menu__item_icon menu__light turn_off"
            : "menu__item_icon menu__light turn_on"
        }
      >
        <span>{this.state.turnOnOffLight ? "on" : "off"}</span>
        <i class="switcher" />
      </button>
    );
  }
}

export default ToggleLight;
