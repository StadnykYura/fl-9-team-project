import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthService from '../features/authorization/auth-service';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }
  render() {
    if (this.Auth.getToken() === null) {
      return <Redirect to={routes.SIGN_IN} />;
    }

    return <Route {...this.props} />;
  }
}

export default PrivateRoute;
