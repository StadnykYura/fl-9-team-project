import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import lightLogo from '../../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../../assets/icons/light-bulb-off.svg';

class Hall extends Component {
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
            <svg height="700" width="700" className ="hall-room"
                onClick={this.handlerClick.bind(this)}>
                <rect width="200" height="100" x="300" y="150"/>

                <path d="M 300 150 L 300 250" />
                <path d="M 300 250 L 200 250" />
                <path d="M 200 250 L 200 500" />
                <path d = "M 200 500 L 400 500" />

                <rect width="300" height="50" x="200" y="250"/>
                <rect width="200" height="200" x="200" y="300"/>

                <text x= "270" y="300">
                {this.props.roomData.roomInfo.name}
                </text>                             
                <image id='light' href = {  this.state.isLightOn ? lightLogo : noLightLogo} x = "420" y ="170" />
 
            </svg>
        )
    }
}

export default withRouter(Hall);