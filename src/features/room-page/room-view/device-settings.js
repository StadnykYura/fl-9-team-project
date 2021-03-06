import React, { Component } from 'react';

import RangeInput from './range-input/range-input';

export default class DeviceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRangeValue: null,
      currentDeviceSettingKey: null,
    };

    this.onInputRangeChange = this.onInputRangeChange.bind(this);
    this.onDeviceOnOff = this.onDeviceOnOff.bind(this);
  }

  onDeviceOnOff() {
    this.props.onDeviceOnOff(this.props.currentDevice);
  }

  onInputRangeChange(value, idKey) {
    this.setState({
      currentRangeValue: value,
      currentDeviceSettingKey: idKey,
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
          <p className="settings-device-image">
            <i className={`icon ${currentDevice.url}`} />
          </p>
          <p className="settings-device-name">{currentDevice.name} </p>
          <button
            disabled={this.props.isTurnOffTogglerLoading}
            onClick={this.onDeviceOnOff}
            className={
              currentDevice.isOn
                ? 'settings-device-on-off turn_on'
                : 'settings-device-on-off turn_off'
            }
          >
            <span>{currentDevice.isOn ? 'on' : 'off'}</span>
            <i className="switcher" />
          </button>
        </div>
        {currentDevice.isMutable &&
          Object.keys(currentDevice.deviceSettings).map(idKey => {
            switch (currentDevice.deviceSettings[idKey].type) {
              case 'range':
                return (
                  <RangeInput
                    key={idKey}
                    isMutableDataIsLoading={this.props.isMutableDataIsLoading}
                    currentDevice={currentDevice}
                    currentSetting={currentDevice.deviceSettings[idKey]}
                    onMutableDataCurrentValueUpdate={
                      this.props.handleMutableDataCurrentValueUpdate
                    }
                    onInputRangeChange={this.onInputRangeChange}
                    currentRangeValue={this.state.currentRangeValue}
                    currentDeviceSettingKey={this.state.currentDeviceSettingKey}
                  />
                );
              case 'toggle':
                return <div>Toggle</div>;
              case 'modes':
                return <div>Modes</div>;

              default:
                return <div>Nothing</div>;
            }
          })}
      </React.Fragment>
    );
  }
}
