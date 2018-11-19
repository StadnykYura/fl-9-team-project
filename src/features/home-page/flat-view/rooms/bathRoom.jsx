import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import lightLogo from '../../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../../assets/icons/light-bulb-off.svg';

class BathRoom extends Component {
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
            <svg height="500" width="700" className="bath-room"
                onClick={this.handlerClick.bind(this)}>
                <rect width="200" height="150" x="300" y="0" stroke = "black"/>
                <text x= "320" y="100" >{this.props.roomData.roomInfo.name}</text>  
                <image id='light' href = {  this.state.isLightOn ? lightLogo : noLightLogo} x = "420" y ="10" />
            </svg>
        )
    }
}

export default withRouter(BathRoom);