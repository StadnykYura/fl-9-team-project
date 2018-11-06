import React, { Component } from 'react';
import { firebase } from '../../../firebase';

class ToggleConditioner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnOnOffConditioner: true,
      isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const user = firebase.auth.currentUser;
    this.setState({
      isLoading: true,
    });
    if (user) {
      firebase.db
        .collection('users')
        .doc(user.uid)
        .collection('rooms')
        .get()
        .then(documents => {
          documents.docs.forEach(document => {
            const roomDocRef = firebase.db
              .collection('users')
              .doc(user.uid)
              .collection('rooms')
              .doc(document.id);
            if (document.data().consistConditioner) {
              roomDocRef
                .collection('devices')
                .get()
                .then(documents => {
                  documents.docs.forEach(document => {
                    const deviceDocRef = roomDocRef
                      .collection('devices')
                      .doc(document.id);
                    deviceDocRef.update({
                      isOn: this.state.turnOnOffConditioner,
                    });
                  });
                });
            }
          });
          this.setState({
            isLoading: false,
          });
          this.setState(prevstate => ({
            turnOnOffConditioner: !prevstate.turnOnOffConditioner,
          }));
        });
    }
  };

  render() {
    const { turnOnOffConditioner, isLoading } = this.state;
    return (
      <button
        disabled={isLoading}
        onClick={this.handleClick}
        className={
          turnOnOffConditioner
            ? 'menu__item_icon menu__conditioner turn_on'
            : 'menu__item_icon menu__conditioner turn_off'
        }
      >
        <span>{turnOnOffConditioner ? 'on' : 'off'}</span>
        <i className="switcher" />
      </button>
    );
  }
}

export default ToggleConditioner;
