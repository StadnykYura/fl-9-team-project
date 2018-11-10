import React from 'react';

import AuthUserContext from './auth-user.context';
import AuthService from './auth-service';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.Auth = new AuthService();

      this.state = {
        userUID: this.Auth.getToken(),
      };

      this.authorize = this.authorize.bind(this);
      this.logout = this.logout.bind(this);
    }

    authorize(UID) {
      this.Auth.setToken(UID);

      this.setState({
        userUID: UID,
      });
    }

    logout() {
      this.Auth.logout();

      this.setState({
        userUID: null,
      });
    }

    render() {
      const auth = {
        userUID: this.state.userUID,
        authorize: this.authorize,
        logout: this.logout,
      };

      return (
        <AuthUserContext.Provider value={auth}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
