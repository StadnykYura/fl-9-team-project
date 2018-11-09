import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const NotFound = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
    <Link to={routes.HOME}>>> Home</Link>
  </div>
);

export default NotFound;
