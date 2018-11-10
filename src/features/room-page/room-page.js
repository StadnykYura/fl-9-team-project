import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HomepageNavTop from '../home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../home-page/homepage-nav-bottom/homepage-nav-bottom';

import RoomView from './room-view/room-view';
import AuthService from '../authorization/auth-service';
import { firebase } from '../../firebase';

class RoomPage extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();

    this.state = {
      room: null,
    };
  }

  componentDidMount() {
    const uid = this.Auth.getToken();
    let roomData = {};
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .get()
        .then(documents => {
          const neededRoom = documents.docs.find(
            document => document.id === this.props.match.params.id
          );
          roomData = {
            id: neededRoom.id,
            name: neededRoom.data().name,
            turnOnOffLight: neededRoom.data().turnOnOffLight,
          };
          this.setState({
            room: roomData,
          });
        });
    } else {
      console.log('user didn`t logged');
    }
  }

  render() {
    const { room } = this.state;

    return (
      <div className="page">
        <div className="home-nav-wrapper wrapper-margin-bottom">
          <HomepageNavTop />
        </div>
        <div className="flat-container">
          {room == null ? (
            <div>Room Loading</div>
          ) : (
            <RoomView room={this.state.room} />
          )}
        </div>
        <div className="home-nav-wrapper wrapper-margin-bottom">
          <HomepageNavBottom />
        </div>
      </div>
    );
  }
}

export default withRouter(RoomPage);
