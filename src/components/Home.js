import React, { Component } from 'react';

import withAuthorization from '../features/authorization/with-authorization.hoc';
import HomepageNavTop from '../features/home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../features/home-page/homepage-nav-bottom/homepage-nav-bottom';
import FlatView from '../features/home-page/flat-view/flat-view';
import FlatViewLoader from '../features/home-page/flat-view/FlatViewLoader/FlatViewLoader';
import { firebase } from '../firebase';
class Home extends Component {
  constructor() {
    super();

    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    const user = firebase.auth.currentUser;
    let roomsData = [];
    if (user) {
      firebase.db
        .collection('users')
        .doc(user.uid)
        .collection('rooms')
        .get()
        .then(documents => {
          documents.docs.forEach(document => {
            roomsData.push(document.data());
          });
          this.setState({
            rooms: roomsData,
          });
        });
    } else {
      console.log('User didn`t sign in');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="home-nav-wrapper">
            <HomepageNavTop />
          </div>
          <div className="flat-container">
            {this.state.rooms.length === 0 ? (
              <FlatViewLoader />
            ) : (
              <FlatView rooms={this.state.rooms} />
            )}
          </div>
          <div className="home-nav-wrapper">
            <HomepageNavBottom />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
