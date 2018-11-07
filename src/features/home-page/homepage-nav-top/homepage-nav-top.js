import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import SignOutButton from '../../authorization/sign-out.button';

class HomepageNavTop extends Component {
  render() {
    return (
      <section className="homepage">
        <ul className="menu">
          <li className="menu__item">
            {/* <a className="menu__link menu__home menu__item_icon" href="/home"> */}
            <Link
              to={routes.HOME}
              className="menu__item_icon menu__home menu__link"
            >
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link to={routes.HOME + routes.KITCHEN} className="menu__link">
              Flat manager
            </Link>
          </li>
          <li className="menu__item menu__item-nobg">
            <span className="menu__weather">Weather</span>
          </li>
          <li className="menu__item menu__item-nobg">
            <span className="menu__time">Time</span>
          </li>
          <li className="menu__item">
            {/* <a
                className=" menu__link menu__settings menu__item_icon"
                href="?"
              >
                Settings
              </a> */}
            <SignOutButton />
          </li>
        </ul>
      </section>
    );
  }
}

export default HomepageNavTop;
