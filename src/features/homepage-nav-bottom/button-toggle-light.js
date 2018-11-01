import React, { Component } from "react";

class ToggleLight extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={
          this.state.isToggleOn
            ? "menu__item_icon menu__light turn_off"
            : "menu__item_icon menu__light turn_on"
        }
      >
        <span>{this.state.isToggleOn ? "on" : "off"}</span>
        <i class="switcher" />
      </button>
    );
  }
}

export default ToggleLight;
