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
    this.props.onInputRangeChange(parseInt(e.target.value));
    this.onChange(parseInt(e.target.value), this.props.currentDevice);
  }

  handleInputMouseUp(e) {
    this.props.onMutableDataCurrentValueUpdate(
      parseInt(e.target.value),
      this.props.currentDevice
    );
  }

  render() {
    const {
      unit,
      maxValue,
      minValue,
      step,
      title,
    } = this.props.currentDevice.mutableData;
    return (
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', marginBottom: '6px' }}>
          <p>{title}</p>
          {this.props.currentRangeValue}
          {unit}
        </span>
        <hr />
        <React.Fragment>
          <span>min {minValue}</span>
          <input
            disabled={this.props.isMutableDataIsLoading}
            type="range"
            value={this.props.currentRangeValue}
            min={minValue}
            max={maxValue}
            className="slider"
            onChange={this.handleSliderChange}
            // onMouseUp={this.handleInputMouseUp}
            // onTouchEnd={this.handleInputMouseUp}
            step={step}
          />
          <span>max {maxValue}</span>
        </React.Fragment>
      </div>
    );
  }
}
