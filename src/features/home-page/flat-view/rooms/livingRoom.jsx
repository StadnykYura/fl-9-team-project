import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import lightLogo from '../../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../../assets/icons/light-bulb-off.svg';

import turnOnOffLightInRoom from '../../../../services/local-action-light.js'

class LivingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLightOn: true
        }
    }

    handlerClick(e) {
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
            <svg height="700" width="700" className="living-room"
                onClick={this.handlerClick.bind(this)}>

                <path d="M 0 0 L 0 500" />
                <rect width="300" height="250" x="0" y="0" />
                <path d="M 0 500 L 200 500" />
                <text x="80" y="200">
                    {this.props.roomData.roomInfo.name}
                </text>
                <rect width="200" height="250" x="0" y="250" />
                <path d="M 0 0 L 300 0" />

                <image id='light' href={this.state.isLightOn ? lightLogo : noLightLogo}
                    x="220" y="10" />

            </svg>
        )
    }
}

export default withRouter(LivingRoom);