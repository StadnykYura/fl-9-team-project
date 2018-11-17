import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from '../../constants/routes';

import AuthUserContext from './auth-user.context';

const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <AuthUserContext.Consumer>
      {auth => {
        return auth.userUID ? (
          <Route {...rest} render={props => <Component auth={auth} />} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        );
      }}
    </AuthUserContext.Consumer>
  );
};

export default PrivateRoute;
