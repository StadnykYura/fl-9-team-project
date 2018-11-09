import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from '../constants/routes';

import HomePage from './Home';
import NotFound from './not-found.page';
import PrivateRoute from './PrivateRoute';
import UnAuthorizedRoute from './UnAuthorizedRoute';

import SignInPage from '../features/authorization/sign-in.page';
import withAuthentication from '../features/authorization/with-authentication.hoc';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <PrivateRoute exact path={routes.HOME} component={HomePage} />
            <UnAuthorizedRoute
              exact
              path={routes.SIGN_IN}
              component={SignInPage}
            />
            <PrivateRoute exact path={routes.LANDING} component={HomePage} />
            <PrivateRoute
              exact
              path={routes.HOME_ROOM_ID}
              component={NotFound}
            />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuthentication(App);
