import React, { Component } from 'react';
import themes from '../../constants/colors.themes.constants';
import { firebase } from '../../firebase';
import AuthService from '../authorization/auth-service';

class ThemeToggler extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      nightMode: localStorage.getItem('nightMode') === 'true' ? true : false,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.state.nightMode !== null) {
      this.setTheme();
    } else {
      const uid = this.Auth.getToken();
      if (uid) {
        firebase.db
          .collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            this.setState({
              nightMode: doc.data().nightMode,
            });
          });
      }
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.nightMode !== prevState.nightMode) {
      this.setTheme();
    }
  }

  setTheme = () => {
    const theme = themes[this.state.nightMode ? 'DARK' : 'LIGHT'];
    Object.keys(theme).forEach(key => {
      const cssKey = `--${key}`;
      const cssValue = theme[key];
      document.body.style.setProperty(cssKey, cssValue);
    });
  };

  toggleTheme = () => {
    this.setState({
      isLoading: true,
    });
    localStorage.setItem('nightMode', `${!this.state.nightMode}`);
    const uid = this.Auth.getToken();
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .update({
          nightMode: !this.state.nightMode,
        })
        .then(() => {
          this.setState(prevState => ({
            nightMode: !prevState.nightMode,
            isLoading: false,
          }));
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button
          disabled={this.state.isLoading}
          onClick={this.toggleTheme}
          className={
            this.state.nightMode
              ? 'menu__item_icon menu__daytime_night'
              : 'menu__item_icon menu__daytime_day'
          }
        >
          <span>{this.state.nightMode ? 'night' : 'day'}</span>
        </button>
      </React.Fragment>
    );
  }
}

export default ThemeToggler;
