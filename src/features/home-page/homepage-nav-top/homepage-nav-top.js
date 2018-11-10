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
            <Link to={routes.HOME} className="menu__link">
              Flat manager
            </Link>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="?">
              Statistic
            </a>
          </li>
          <li className="menu__item">
            {/* <a
                    className=" menu__link menu__settings menu__item_icon"
                    href="?"
                  >
                    Settings
                  </a> */}
            <Button onClick={this.onClickHandler}>Sign Out</Button>
          </li>
        </ul>
      </section>
    );
  }
}

export default HomepageNavTop;
