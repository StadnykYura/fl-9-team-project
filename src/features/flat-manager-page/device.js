import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import dndTypes from '../../constants/dnd-types.constants';
const spec = {
  beginDrag(props) {
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
        className={this.props.isDragging ? 'startDrag' : '  stopDrag'}
        title="drag device to move to other room"
      >
        <div className="device-information">
          <div className="img-icon">
            <i className={` ${this.props.deviceData.url}`} />
          </div>
          <div className="device-name">
            <p>{this.props.name}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default DragSource(dndTypes.DEVICE, spec, collect)(Device);
