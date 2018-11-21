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
          <li className="menu__item" title="Home">
            <Link
              to={routes.HOME}
              className="menu__item_icon menu__home menu__link"
            >
              Home
            </Link>
          </li>
          <li className="menu__item menu__item-manager">
            <Link to={routes.FLAT_MANAGER} className="menu__link">
              Apartment manager
            </Link>
          </li>
          <li className="menu__item" title="Sign Out">
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
