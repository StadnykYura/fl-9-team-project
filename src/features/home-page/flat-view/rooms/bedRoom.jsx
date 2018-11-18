import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import lightLogo from '../../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../../assets/icons/light-bulb-off.svg';

import  turnOnOffLightInRoom from '../../../../services/local-action-light.js';

class BadRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLightOn: true,
        }
    }

    handlerClick(e) {
        if (e.target.id === 'light') {
            this.setState(prevState => ({
                isLightOn: !prevState.isLightOn
            }))
            console.log(this.props.userUID);
            turnOnOffLightInRoom (e.target, this.props.roomData.roomID, this.props.userUID);
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
            <svg height="500" width="700" className="bed-room"
                onClick={this.handlerClick.bind(this)}>
                <rect width="300" height="200" x="400" y="300" stroke = "black"/>
                <text x= "420" y="450" >{this.props.roomData.roomInfo.name}</text>  
                <image id='light' href = {  this.state.isLightOn ? lightLogo : noLightLogo} x = "620" y ="320" />
            </svg>
        )
    }
}

export default withRouter(BadRoom);