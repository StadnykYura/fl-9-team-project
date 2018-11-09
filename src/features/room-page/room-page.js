import React, { Component } from 'react';
import withAuthentication from '../authorization/with-authentication.hoc';

import HomepageNavTop from '../home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../home-page/homepage-nav-bottom/homepage-nav-bottom';

import RoomView from './room-view/room-view';

class RoomPage extends Component {
  render() {
    return (
      <div>
        <div className="home-nav-wrapper wrapper-margin-bottom">
          <HomepageNavTop />
        </div>
        <RoomView />
        <div className="home-nav-wrapper wrapper-margin-bottom">
          <HomepageNavBottom />
        </div>
      </div>
    );
  }
}

export default withAuthentication(RoomPage);
