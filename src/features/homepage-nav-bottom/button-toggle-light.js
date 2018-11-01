import React, { Component } from "react";
import TurnTheGlobalLightButton from "../home-page/global-actions/turn-the-global-light.Button";

class ToggleLight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }

  render() {
    return (
      // <button
      //   onClick={this.turnOffOnnLight}
      //   className={
      //     this.state.isToggleOn
      //       ? "menu__item_icon menu__light turn_off"
      //       : "menu__item_icon menu__light turn_on"
      //   }
      // >

      //   <span>{this.state.isToggleOn ? "on" : "off"}</span>
      //   <i class="switcher" />
      // </button>
      <TurnTheGlobalLightButton />
    );
  }
}

export default ToggleLight;
