import React, { Component } from 'react';

// import withAuthorization from '../features/authorization/with-authorization.hoc';
import HomepageNavTop from '../features/home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../features/home-page/homepage-nav-bottom/homepage-nav-bottom';
import FlatView from '../features/home-page/flat-view/flat-view';
import FlatViewLoader from '../features/home-page/flat-view/FlatViewLoader/FlatViewLoader';
import AuthService from '../features/authorization/auth-service';

import { firebase } from '../firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsData: null,
      isLoading: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    const uid = this.Auth.getToken();
    this.setState({
      isLoading: true,
    });
    let roomsData = [];
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
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
            isLoading: false,
          });
        });
    }
  }

  render() {
    const { roomsData, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="page">
          <div className="home-nav-wrapper">
            <HomepageNavTop />
          </div>
          <div className="flat-container">
            {isLoading ? (
              <FlatViewLoader />
            ) : (
              <FlatView roomsData={roomsData} />
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

// const authCondition = authUser => !!authUser;
// export default withAuthorization(authCondition)(Home);

export default Home;
