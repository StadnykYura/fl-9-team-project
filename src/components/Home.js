import React, { Component } from 'react';

import withAuthorization from '../features/authorization/with-authorization.hoc';
import HomepageNavTop from '../features/home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../features/home-page/homepage-nav-bottom/homepage-nav-bottom';
import { firebase } from '../firebase';
/////////////////////////////////
import FlatManager from '../features/flat-manager-page/flat-manager';
class Home extends Component {
  constructor() {
    super();
    this.state = {
      roomsData: null,
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
            roomsData.push({
              roomID: document.id,
              roomInfo: document.data(),
            });
          });
          this.setState({
            roomsData: roomsData,
          });
        });
    }
  }

  render() {
    // console.log(this.props.roomsData);
    return (
      <React.Fragment>
        <div className="page">
          <div className="home-nav-wrapper">
            <HomepageNavTop />
          </div>
          <div>
            <FlatManager roomsData={this.state.roomsData} />
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
