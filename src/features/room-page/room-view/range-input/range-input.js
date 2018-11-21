import React, { Component } from 'react';
import debounce from 'lodash/debounce';

export default class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleInputMouseUp = this.handleInputMouseUp.bind(this);

    this.onChange = debounce(this.props.onMutableDataCurrentValueUpdate, 1000);
  }

  handleSliderChange(e) {
    this.props.onInputRangeChange(
      parseInt(e.target.value),
      this.props.currentSetting.id
    );
    this.onChange(
      parseInt(e.target.value),
      this.props.currentDevice,
      this.props.currentSetting
    );
  }

  handleInputMouseUp(e) {
    this.props.onMutableDataCurrentValueUpdate(
      parseInt(e.target.value),
      this.props.currentDevice,
      this.props.currentSetting
    );
  }

  render() {
    const {
      unit,
      maxValue,
      minValue,
      currentValue,
      step,
      title,
    } = this.props.currentSetting.config;
    return (
      <div className="input-range-wrapper">
        <span className=".input-range-title">
          <div className="input-title">
            {title}
            <span>
              {this.props.currentDeviceSettingKey ===
              this.props.currentSetting.id
                ? this.props.currentRangeValue
                : currentValue}
            </span>
            {unit}
          </div>
        </span>
        <hr />
        <React.Fragment>
          <div className="input-range">
            <span>min {minValue}</span>
            <input
              disabled={this.props.isMutableDataIsLoading}
              type="range"
              value={
                this.props.currentDeviceSettingKey ===
                this.props.currentSetting.id
                  ? this.props.currentRangeValue
                  : currentValue
              }
              min={minValue}
              max={maxValue}
              className="slider"
              onChange={this.handleSliderChange}
              step={step}
            />
            <span>max {maxValue}</span>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
