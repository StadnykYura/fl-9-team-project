import React, { Component } from 'react';
import ToggleLight from './button-toggle-light';
import ToggleConditioner from './button-toggle-conditioner';
import Weather from '../weather/show-weather';

import ShowTime from '../date-time/show-time';
import ShowDate from '../date-time/show-date';

import ThemeToggler from '../../theme-toggler/theme-toggler';

class HomepageNavBottom extends Component {
  render() {
    return (
      <section className="homepage">
        <ul className="menu">
          <li className="menu__item menu__item-nobg">
            <ToggleLight globalLightChange={this.props.globalLightChange} />
          </li>
          <li className="menu__item menu__item-nobg">
            <ToggleConditioner />
          </li>
          <li className="menu__item menu__item-nobg">
            <ThemeToggler />
          </li>
          <li className="menu__item menu__item-nobg">
            <span className="menu__time">
              <ShowTime />
              <ShowDate />
            </span>
          </li>

          <li className="menu__item menu__item-nobg">
            <span className="menu__weather">
              <Weather />
            </span>
          </li>
        </ul>
      </section>
    );
  }
}

export default HomepageNavBottom;
