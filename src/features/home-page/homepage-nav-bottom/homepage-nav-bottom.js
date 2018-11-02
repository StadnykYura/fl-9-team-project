import React, { Component } from "react";
import ToggleLight from "./button-toggle-light";
import ToggleConditioner from "./button-toggle-conditioner";
import ToggleDay from "./button-toggle-day";
class HomepageNavBottom extends Component {
  render() {
    return (
      <div className="wrapper">
        <section className="homepage">
          <ul className="menu">
            <li className="menu__item">
              <ToggleLight />
            </li>
            <li className="menu__item">
              <ToggleConditioner />
            </li>
            <li className="menu__item">
              <ToggleDay />
            </li>
            <li className="menu__item">
              <a className="menu__link" href="?">
                Global action
              </a>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default HomepageNavBottom;
