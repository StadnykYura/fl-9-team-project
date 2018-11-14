import React, { Component } from 'react';
import themes from '../../constants/colors.themes.constants';

class ThemeToggler extends Component {
  componentDidMount() {
    this.setTheme();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTheme !== prevState.currentTheme) {
      this.setTheme();
    }
  }
  constructor() {
    super();
    this.state = {
      currentTheme: 'LIGHT',
      isToggleOn: true,
    };
  }

  setTheme = () => {
    const theme = themes[this.state.currentTheme];
    Object.keys(theme).forEach(key => {
      const cssKey = `--${key}`;
      const cssValue = theme[key];
      document.body.style.setProperty(cssKey, cssValue);
    });
  };

  toggleTheme = () => {
    this.state.currentTheme === 'LIGHT'
      ? this.setState({ currentTheme: 'DARK' })
      : this.setState({ currentTheme: 'LIGHT' });

    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.toggleTheme}
          className={
            this.state.isToggleOn
              ? 'menu__item_icon menu__daytime_day'
              : 'menu__item_icon menu__daytime_night'
          }
        >
          <span>{this.state.isToggleOn ? 'day' : 'night'}</span>
        </button>
      </React.Fragment>
    );
  }
}

export default ThemeToggler;
