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
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
