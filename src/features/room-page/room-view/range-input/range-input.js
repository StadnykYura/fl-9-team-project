import React, { Component } from 'react';
import AuthService from '../../../authorization/auth-service';
// import { firebase } from '../../../../firebase';
export default class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // deviceID: 0,
      currentValueInput: this.props.device.mutableData.currentValue,
      // minValue: 0,
      // maxValue: 0,
      // unit: '',
      // step: 0,
      // title: '',
      isChanged: false,
    };
    this.Auth = new AuthService();
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleCancelChange = this.handleCancelChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }
  // componentDidMount() {
  //   const uid = this.props.userUID;
  //   const deviceDocRef = firebase.db
  //     .collection('users')
  //     .doc(uid)
  //     .collection('rooms')
  //     .doc(this.props.roomID)
  //     .collection('devices')
  //     .doc(this.props.deviceID);
  //   if (uid) {
  //     deviceDocRef.get().then(doc => {
  //       this.setState({
  //         deviceID: this.props.deviceID,
  //         currentValue: doc.data().mutableData.currentValue,
  //         unit: doc.data().mutableData.unit,
  //         minValue: doc.data().mutableData.minValue,
  //         maxValue: doc.data().mutableData.maxValue,
  //         step: doc.data().mutableData.step,
  //         title: doc.data().mutableData.title,
  //       });
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.device.id !== this.props.device.id) {
      this.setState({
        currentValueInput: this.props.device.mutableData.currentValue,
        isChanged: false,
      });
    }
  }

  handleSliderChange(e) {
    this.setState({
      currentValueInput: parseInt(e.target.value),
      isChanged: true,
    });
  }
  handleCancelChange() {
    this.setState({ isChanged: false });
  }

  handleSaveChange() {
    this.setState({ isChanged: false });
    this.props.handeSaveMutable(
      this.props.roomID,
      this.props.device.id,
      this.state.currentValueInput
    );
    // const uid = this.props.userUID;
    // const deviceDocRef = firebase.db
    //   .collection('users')
    //   .doc(uid)
    //   .collection('rooms')
    //   .doc(this.props.roomID)
    //   .collection('devices')
    //   .doc(this.props.device.id);
    // if (uid) {
    //   deviceDocRef
    //     .update({
    //       'mutableData.currentValue': this.state.currentValueInput,
    //     })
    //     .then(() => {
    //       this.setState({ isChanged: false });
    //     });
    // }
  }
  render() {
    const { isChanged, currentValueInput } = this.state;
    const {
      unit,
      maxValue,
      minValue,
      currentValue,
      step,
      title,
    } = this.props.device.mutableData;
    // debugger;
    return (
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', marginBottom: '6px' }}>
          <p>{title}</p>
          {isChanged ? currentValueInput : currentValue}
          {unit}
        </span>
        <hr />
        <span>min {minValue}</span>
        <input
          type="range"
          // defaultValue={currentValue}
          value={isChanged ? currentValueInput : currentValue}
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
