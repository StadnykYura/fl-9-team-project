import React, { Component } from 'react';
import { firebase } from '../../../firebase';

class ToggleLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnOnOffLight: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const batch = firebase.db.batch();
    const user = firebase.auth.currentUser;
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
            batch.update(roomDocRef, {
              turnOnOffLight: !this.state.turnOnOffLight,
            });
          });
          batch.commit();
          this.setState(prevstate => ({
            turnOnOffLight: !prevstate.turnOnOffLight,
          }));
        });
    }
  };

  render() {
    const { turnOnOffLight } = this.state;
    return (
      <button
        onClick={this.handleClick}
        className={
          turnOnOffLight
            ? 'menu__item_icon menu__conditioner turn_on'
            : 'menu__item_icon menu__conditioner turn_off'
        }
      >
        <span>{turnOnOffLight ? 'on' : 'off'}</span>
        <i className="switcher" />
      </button>
    );
  }
}

export default ToggleLight;
