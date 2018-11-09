import React, { Component } from 'react';

import { auth } from '../../firebase';
import AuthService from './auth-service';

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Auth = new AuthService();
  }

  onClickHandler = event => {
    auth.doSignOut();
    this.Auth.logout();
  };

  render() {
    return (
      <button type="button" onClick={this.onClickHandler.bind(this)}>
        Sign Out
      </button>
    );
  }
}

export default SignOutButton;
