import React, { Component } from "react";

class ToggleDay extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
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
            ? "menu__item_icon menu__daytime_day"
            : "menu__item_icon menu__daytime_night"
        }
      >
        <span>{this.state.isToggleOn ? "day" : "night"}</span>
      </button>
    );
  }
}

export default ToggleDay;
