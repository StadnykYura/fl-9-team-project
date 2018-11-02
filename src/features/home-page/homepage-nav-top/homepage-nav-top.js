import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../../constants/routes";
import SignOutButton from "../../authorization/sign-out.button";

class HomepageNavTop extends Component {
  render() {
    return (
      <div className="wrapper">
        <section className="homepage">
          <ul className="menu">
            <li className="menu__item">
              {/* <a className="menu__link menu__home menu__item_icon" href="/home"> */}
              <Link
                to={routes.HOME}
                className="menu__link menu__home menu__item_icon"
              >
                Home
              </Link>
            </li>
            <li className="menu__item">
              <a className="menu__link" href="?">
                Flat manager
              </a>
            </li>
            <li className="menu__item">
              <span className="menu__weather">Weather</span>
            </li>
            <li className="menu__item">
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
      </div>
    );
  }
}

export default HomepageNavTop;
