import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import AuthUserContext from '../../authorization/auth-user.context';
import Button from '../../../common/common.button';
import { auth } from '../../../firebase';

class HomepageNavTop extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    auth.doSignOut();
    this.context.logout();
  }

  render() {
    return (
      <section className="homepage">
        <ul className="menu">
          <li className="menu__item">
            <Link
              to={routes.HOME}
              className="menu__item_icon menu__home menu__link"
            >
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to={routes.FLAT_MANAGER}
              className="menu__link menu__item-manager "
            >
              Apartment manager
            </Link>
          </li>
          <li className="menu__item">
            <Button
              onClick={this.onClickHandler}
              signOut="menu__item_icon menu__sign-out menu__link"
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </section>
    );
  }
}

export default HomepageNavTop;
