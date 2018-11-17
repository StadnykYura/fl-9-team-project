import React, { Component } from 'react';
import Room from './room';
import { firebase } from '../../firebase';

class FlatManager extends Component {
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
      .doc(firebase.auth.currentUser.uid)
      .collection('rooms')
      .get();
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchRooms().then(documents => {
      console.log(documents);
    });

    // .then(rooms => {
    //   this.setState({
    //     rooms: rooms,
    //     isLoading: false,
    //   });
    // });
  }

  renderRoom(room) {
    return <Room key={room.id} id={room.id} name={room.name} />;
  }

  render() {
    if (this.state.isLoading) {
      return <p>Room loading...</p>;
    }

    return (
      <div className="flat-manager">
        {this.state.rooms.map(this.renderRoom)}
      </div>
    );
  }
}
export default FlatManager;
