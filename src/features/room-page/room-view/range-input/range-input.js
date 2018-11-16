import React, { Component } from 'react';

import AuthService from '../../../authorization/auth-service';
import { firebase } from '../../../../firebase';

export default class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docDataid: 0,
      currentValue: 0,
      minValue: 0,
      maxValue: 0,
      unit: '',
      isChanged: false,
    };
    this.Auth = new AuthService();
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleCancelChange = this.handleCancelChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }
  componentDidMount() {
    const uid = this.Auth.getToken();
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(this.props.roomID)
      .collection('devices')
      .doc(this.props.deviceID);
    if (uid) {
      deviceDocRef
        .collection('mutableData')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.setState({
              docDataid: doc.id,
              currentValue: doc.data().currentValue,
              unit: doc.data().unit,
              minValue: doc.data().minValue,
              maxValue: doc.data().maxValue,
            });
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
    const uid = this.Auth.getToken();
    const deviceDocRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(this.props.roomID)
      .collection('devices')
      .doc(this.props.deviceID)
      .collection('mutableData')
      .doc(this.state.docDataid);
    if (uid) {
      deviceDocRef
        .update({
          currentValue: this.state.currentValue,
        })
        .then(() => {
          this.setState({ isChanged: false });
        });
    }
  }
  render() {
    const { unit, maxValue, minValue, currentValue, isChanged } = this.state;
    return (
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', marginBottom: '6px' }}>
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
          step="1"
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
