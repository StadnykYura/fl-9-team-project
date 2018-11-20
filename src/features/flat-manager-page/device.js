import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import dndTypes from '../../constants/dnd-types.constants';
const spec = {
  beginDrag(props, monitor) {
    // console.log('почалось сування цей девайс',props.);
    return props;
  },
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

class Device extends Component {
  render() {
    return this.props.connectDragSource(
      <div
        // style={{ background: this.props.isDragging ? 'red' : 'green' }}
        // className="device"
        className={'device' + this.props.isDragging ? 'startDrag' : 'stopDrag'}
      >
        <div className="device-info">
          <img
            className="img-icon"
            src={this.props.deviceData.url}
            alt="device"
          />
          <p className="device-name">{this.props.name}</p>
        </div>
      </div>
    );
  }
}
export default DragSource(dndTypes.DEVICE, spec, collect)(Device);
