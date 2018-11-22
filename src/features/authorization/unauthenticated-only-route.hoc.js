import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from '../../constants/routes';

import AuthUserContext from './auth-user.context';

const UnauthenticatedOnlyRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <AuthUserContext.Consumer>
      {auth => {
        return auth.userUID ? (
          <Redirect to={routes.HOME} />
        ) : (
          <Route {...rest} render={props => <Component auth={auth} />} />
        );
      }}
    </AuthUserContext.Consumer>
  );
};

export default UnauthenticatedOnlyRoute;
