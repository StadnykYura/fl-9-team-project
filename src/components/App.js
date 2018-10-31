import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";

import { firebase } from "../firebase";

import "../styles/App.scss";

import LandingPage from "./Landing";
// import SignUpPage from './SignUp';
import SignInPage from "../features/authorization/sign-in.page";
import HomePage from "./Home";
import Navigation from "./Navigation";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr />

          <Route exact path={routes.LANDING} component={LandingPage} />
          {/* <Route
            exact path={routes.SIGN_UP}
            component={SignUpPage}
          /> */}
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.HOME} component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
