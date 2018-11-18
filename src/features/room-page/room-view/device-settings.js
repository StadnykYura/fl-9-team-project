import React, { Component } from 'react';

import RangeInput from './range-input/range-input';

export default class DeviceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRangeValue: this.props.currentDevice.mutableData
        ? this.props.currentDevice.mutableData.currentValue
        : null,
    };

    this.onInputRangeChange = this.onInputRangeChange.bind(this);
    this.onDeviceOnOff = this.onDeviceOnOff.bind(this);
  }

  onDeviceOnOff() {
    this.props.onDeviceOnOff(this.props.currentDevice);
  }

  onInputRangeChange(value) {
    console.log('Changed input range', value);
    this.setState({
      currentRangeValue: value,
    });
  }

  render() {
    const { currentDevice } = this.props;

    return (
      <React.Fragment>
        <div className="settings-close">
          <button
            className="close-button"
            onClick={this.props.handleSettingsClose}
          />
        </div>
        <div className="settings-info">
          {this.props.title}
          <hr />
          Device name: {currentDevice.name} <hr />
          <button
            disabled={this.props.isTurnOffTogglerLoading}
            onClick={this.onDeviceOnOff}
            className={currentDevice.isOn ? 'turn_on' : 'turn_off'}
          >
            <span>{currentDevice.isOn ? 'on' : 'off'}</span>
            <i className="switcher" />
          </button>
        </div>
        {currentDevice.isMutable && (
          <RangeInput
            isMutableDataIsLoading={this.props.isMutableDataIsLoading}
            currentDevice={currentDevice}
            onMutableDataCurrentValueUpdate={
              this.props.handleMutableDataCurrentValueUpdate
            }
            onInputRangeChange={this.onInputRangeChange}
            currentRangeValue={this.state.currentRangeValue}
          />
        )}
      </React.Fragment>
    );
  }
}
