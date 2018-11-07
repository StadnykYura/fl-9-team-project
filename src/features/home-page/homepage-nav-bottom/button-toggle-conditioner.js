import React, { Component } from 'react';

class ToggleConditioner extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={
          this.state.isToggleOn
            ? 'menu__item_icon menu__conditioner turn_off'
            : 'menu__item_icon menu__conditioner turn_on'
        }
      >
        <span>{this.state.isToggleOn ? 'on' : 'off'}</span>
        <i className="switcher" />
      </button>
    );
  }
}

export default ToggleConditioner;
