import React, { Component } from "react";

import { auth } from "../../firebase";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClickHandler = event => {
    auth.doSignOut();
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
