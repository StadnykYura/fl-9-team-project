import React, { Component } from 'react';

class Theme extends Component {
  componentWillMount() {
    document.getElementById('root').className = 'darktheme';
  }
  componentWillUnmount() {
    document.getElementById('root').className = '';
  }
  render() {
    return <div style={{ display: 'none' }}> </div>;
  }
}

class ToggleDay extends Component {
  constructor() {
    super();
    this.state = {
      isMount: false,
      isToggleOn: true,
    };
  }

  handleClick() {
    this.setState({
      isMount: !this.state.isMount,
    });
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.handleClick.bind(this)}
          className={
            this.state.isToggleOn
              ? 'menu__item_icon menu__daytime_day'
              : 'menu__item_icon menu__daytime_night'
          }
        >
          <span>{this.state.isToggleOn ? 'day' : 'night'}</span>
        </button>

        {this.state.isMount && <Theme />}
      </React.Fragment>
    );
  }
}

export default ToggleDay;
