import React, { Component } from "react";
// import "../styles/Homepage-nav-styles.scss";

import "./homepage-nav-top.styles.scss";

class HomepageNav extends Component {
  render() {
    return (
      <div className="wrapper">
        <section className="homepage">
          <ul className="menu">
            <li className="menu__item">
              <a className="menu__link menu__home menu__item_icon" href="?">
                Home
              </a>
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
              <a
                className=" menu__link menu__settings menu__item_icon"
                href="?"
              >
                Settings
              </a>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default HomepageNav;
