import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";

import HomePage from "./Home";

import SignInPage from "../features/authorization/sign-in.page";
import withAuthentication from "../features/authorization/with-authentication.hoc";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          {/* <Redirect to={routes.SIGN_IN} /> */}

          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.HOME} component={HomePage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuthentication(App);
