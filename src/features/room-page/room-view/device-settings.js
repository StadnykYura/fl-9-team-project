import React, { Component } from 'react';

import RangeInput from './range-input/range-input';

export default class DeviceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentRangeValue: this.props.currentDevice.mutableData
      //   ? this.props.currentDevice.mutableData.currentValue
      //   : null,
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
    // console.log(this.props);
    const { currentDevice } = this.props;

    // if (this.props.currentDevice.deviceSettings) {
    //   const { deviceSettings } = this.props.currentDevice;
    // }

    return (
      <React.Fragment>
        <div className="settings-close">
          <button
            className="close-button"
            onClick={this.props.handleSettingsClose}
          />
        </div>
        <div className="settings-info">
          {/* <p className="settings-title">{this.props.title}</p> */}
          <p className="settings-device-image">
            <img src={currentDevice.url} alt="device" />
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
              // break;
              case 'toggle':
                return <div>Toggle</div>;
              // break;
              case 'modes':
                return <div>Modes</div>;

              default:
                return <div>Nothing</div>;
            }
          })
        // <RangeInput
        //   isMutableDataIsLoading={this.props.isMutableDataIsLoading}
        //   currentDevice={currentDevice}
        //   onMutableDataCurrentValueUpdate={
        //     this.props.handleMutableDataCurrentValueUpdate
        //   }
        //   onInputRangeChange={this.onInputRangeChange}
        //   currentRangeValue={this.state.currentRangeValue}
        // />
        }
      </React.Fragment>
    );
  }
}
