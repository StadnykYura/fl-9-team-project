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
        // style={{ background: this.props.isDragging ? 'var( --menu-color)' : 'white' }}

        className={this.props.isDragging ? 'startDrag' : '  stopDrag'}
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
