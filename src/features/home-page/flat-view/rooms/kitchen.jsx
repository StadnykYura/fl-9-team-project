import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import lightLogo from '../../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../../assets/icons/light-bulb-off.svg';

import turnOnOffLightInRoom from '../../../../services/local-action-light.js'

class Kitchen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLightOn: true,
        }
    }

    handlerClick(e) {
        console.log(e.target.id);
        if (e.target.id === 'light') {
            this.setState(prevState => ({
                isLightOn: !prevState.isLightOn
            }))
            turnOnOffLightInRoom(e.target, this.props.roomData.roomID, this.props.userUID);
        }
        else {
            this.props.history.push(`room/${this.props.roomData.roomID}`);
        }
    }

    render() {
        if (!this.props.roomData) {
            return <div>Loading</div>;
        }
        return (
            <svg height="700" width="700" className="kitchen-room"
                onClick={this.handlerClick.bind(this)}>
                <rect width="200" height="300" x="500" y="0" />
                <text x="550" y="200">
                    {this.props.roomData.roomInfo.name}
                </text>
                <image id='light' href={this.state.isLightOn ? lightLogo : noLightLogo} x="620" y="10" />

            </svg>
        )
    }
}

export default withRouter(Kitchen);