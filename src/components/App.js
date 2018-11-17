import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from '../constants/routes';

import HomePage from './Home';
import NotFound from './not-found.page';

import SignInPage from '../features/authorization/sign-in.page';
import withAuthentication from '../features/authorization/with-authentication.hoc';
import FlatManager from '../features/flat-manager-page/flat-manager';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path={routes.LANDING} component={HomePage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.FLAT_MANAGER} component={FlatManager} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuthentication(App);
