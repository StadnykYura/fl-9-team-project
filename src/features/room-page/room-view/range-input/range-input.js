import React, { Component } from 'react';
import AuthService from '../../../authorization/auth-service';
import { firebase } from '../../../../firebase';
export default class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceID: 0,
      currentValue: 0,
      minValue: 0,
      maxValue: 0,
      unit: '',
      step: 0,
      title: '',
      isChanged: false,
    };
    this.Auth = new AuthService();
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleCancelChange = this.handleCancelChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }
  componentDidMount() {
    const uid = this.props.userUID;
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(this.props.roomID)
      .collection('devices')
      .doc(this.props.deviceID);
    if (uid) {
      deviceDocRef.get().then(doc => {
        this.setState({
          deviceID: this.props.deviceID,
          currentValue: doc.data().mutableData.currentValue,
          unit: doc.data().mutableData.unit,
          minValue: doc.data().mutableData.minValue,
          maxValue: doc.data().mutableData.maxValue,
          step: doc.data().mutableData.step,
          title: doc.data().mutableData.title,
        });
      });
    }
  }
  handleSliderChange(e) {
    this.setState({
      currentValue: parseInt(e.target.value),
      isChanged: true,
    });
  }
  handleCancelChange() {
    this.setState({ isChanged: false });
  }
  handleSaveChange() {
    const uid = this.props.userUID;
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(this.props.roomID)
      .collection('devices')
      .doc(this.props.deviceID);
    if (uid) {
      deviceDocRef
        .update({
          'mutableData.currentValue': this.state.currentValue,
        })
        .then(() => {
          this.setState({ isChanged: false });
        });
    }
  }
  render() {
    const {
      unit,
      maxValue,
      minValue,
      currentValue,
      step,
      title,
      isChanged,
    } = this.state;
    return (
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', marginBottom: '6px' }}>
          {title}
          {currentValue}
          {unit}
        </span>
        <hr />
        <span>min {minValue}</span>
        <input
          type="range"
          defaultValue={currentValue}
          min={minValue}
          max={maxValue}
          className="slider"
          onChange={this.handleSliderChange}
          step={step}
        />
        <span>max {maxValue}</span>
        {isChanged ? (
          <div>
            <button onClick={this.handleSaveChange}>Save</button>
            <button onClick={this.handleCancelChange}>Cancel</button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
