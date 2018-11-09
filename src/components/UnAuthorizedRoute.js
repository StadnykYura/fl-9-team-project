import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import AuthService from '../features/authorization/auth-service';

class UnAuthorizedRoute extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    if (this.Auth.getToken()) {
      return <Redirect to={routes.HOME} />;
    }
    return <Route {...this.props} />;
  }
}

export default UnAuthorizedRoute;
