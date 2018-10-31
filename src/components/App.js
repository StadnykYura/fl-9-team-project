import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";

import "../styles/App.scss";

import LandingPage from "./Landing";
import HomePage from "./Home";
import Navigation from "./Navigation";
// import SignUpPage from './SignUp';
import SignInPage from "../features/authorization/sign-in.page";
import withAuthentication from "../features/authorization/with-authentication.hoc";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <hr />

          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.HOME} component={HomePage} />
          {/* <Route
            exact path={routes.SIGN_UP}
            component={SignUpPage}
          /> */}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
