import React, { Component } from 'react';
import HomepageNavTop from '../../features/home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../../features/home-page/homepage-nav-bottom/homepage-nav-bottom';

import Room from './room';
import { firebase } from '../../firebase';
import AuthUserContext from '../authorization/auth-user.context';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class FlatManager extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      isLoading: false,
    };

    this.renderRoom = this.renderRoom.bind(this);
  }

  fetchRooms() {
    return firebase.db
      .collection('users')
      .doc(this.context.userUID)
      .collection('rooms')
      .get();
  }

  updateRooms(rooms) {
    this.setState({
      rooms: rooms,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchRooms().then(documents => {
      const rooms = [];
      documents.forEach(document => {
        rooms.push({
          id: document.id,
          ...document.data(),
        });
      });

      this.updateRooms(rooms);

      this.setState({ isLoading: false });
    });
  }

  renderRoom(room) {
    return <Room key={room.id} id={room.id} name={room.name} />;
  }

  render() {
    if (this.state.isLoading) {
      return <p>Room loading...</p>;
    }

    return (
      <React.Fragment>
        <div className="page">
          <div className="home-nav-wrapper">
            <HomepageNavTop />
          </div>
          <div className="flat-container">
            <div className="flat-manager">
              {this.state.rooms.map(this.renderRoom)}
            </div>
          </div>
          <div className="home-nav-wrapper">
            <HomepageNavBottom
              globalLightChange={this.handleGlobalLightChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default DragDropContext(HTML5Backend)(FlatManager);
