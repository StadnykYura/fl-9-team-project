import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from '../constants/routes';

import HomePage from './Home';
import NotFound from './not-found.page';
import PrivateRoute from '../features/authorization/private-route.hoc';
import UnauthenticatedOnlyRoute from '../features/authorization/unauthenticated-only-route.hoc';
import ErrorBoundary from './erorr-boundary';

import RoomPage from '../features/room-page/room-page';
import SignInPage from '../features/authorization/sign-in.page';
import withAuthentication from '../features/authorization/with-authentication.hoc';
import FlatManager from '../features/flat-manager-page/flat-manager';

class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Router>
            <React.Fragment>
              <Switch>
                <PrivateRoute exact path={routes.HOME} component={HomePage} />
                <UnauthenticatedOnlyRoute
                  exact
                  path={routes.SIGN_IN}
                  component={SignInPage}
                />
                <PrivateRoute
                  exact
                  path={routes.LANDING}
                  component={HomePage}
                />
                <PrivateRoute
                  exact
                  path={routes.HOME_ROOM_ID}
                  component={RoomPage}
                />
                <PrivateRoute
                  exact
                  path={routes.FLAT_MANAGER}
                  component={FlatManager}
                />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

export default withAuthentication(App);
