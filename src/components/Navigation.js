import React, { Component } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../features/authorization/sign-out.button";
import * as routes from "../constants/routes";

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

class Navigation extends Component {
  render() {
    return (
      <div>
        {this.props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    );
  }
}

export default Navigation;
