import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button
        className={this.props.signOut}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
