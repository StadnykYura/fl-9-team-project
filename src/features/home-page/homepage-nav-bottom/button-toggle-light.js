import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import AuthService from '../../authorization/auth-service';

class ToggleLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnOnOffLight: true,
      isLoading: false,
    };

    this.Auth = new AuthService();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    const batch = firebase.db.batch();
    const uid = this.Auth.getToken();
    this.setState({
      isLoading: true,
    });
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(document => {
            const roomDocRef = firebase.db
              .collection('users')
              .doc(uid)
              .collection('rooms')
              .doc(document.id);
            batch.update(roomDocRef, {
              turnOnOffLight: !this.state.turnOnOffLight,
            });
          });
          batch.commit().then(() => {
            this.setState(prevstate => ({
              isLoading: false,
              turnOnOffLight: !prevstate.turnOnOffLight,
            }));
            if (this.props.globalLightChange) {
              this.props.globalLightChange();
            }
          });
        });
    }
  };

  render() {
    const { turnOnOffLight, isLoading } = this.state;
    return (
      <button
        disabled={isLoading}
        onClick={this.handleClick}
        className={
          turnOnOffLight
            ? 'menu__item_icon menu__light turn_on'
            : 'menu__item_icon menu__light turn_off'
        }
      >
        <span>{turnOnOffLight ? 'on' : 'off'}</span>
        <i className="switcher" />
      </button>
    );
  }
}

export default ToggleLight;
