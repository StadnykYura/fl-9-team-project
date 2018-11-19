import React, { Component } from 'react';
import LivingRoom from './rooms/livingRoom';
import BathRoom from './rooms/bathRoom';
import Kithen from './rooms/kitchen';
import Bedroom from './rooms/bedRoom';
import Hall from './rooms/hall'

import * as roomsID from '../../../constants/roomsID';

class Flat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livingRoom: null,
            bathRoom: null,
            kithen: null,
            bedRoom: null,
            hall: null,
        }
    }
    componentDidMount() {
        const { roomsData } = this.props;
        if (roomsData) {
            roomsData.forEach(room => {
                switch (room.roomID) {
                    case roomsID.LIVINGROOM:
                        this.setState({ livingRoom: room })
                        break;
                    case roomsID.BATHROOM:
                        this.setState({ bathRoom: room })
                        break;
                    case roomsID.KITCHEN:
                        this.setState({ kithen: room })
                        break;
                    case roomsID.BEDROOM:
                        this.setState({ bedRoom: room })
                        break;
                    case roomsID.HALL:
                        this.setState({ hall: room })
                        break;
                }
            });
        }
    }

    render() {
        return (
            <svg
                height="700" width="700" id='parent-svg'
                viewBox="0 0 700 500"
                preserveAspectRatio="xMidYMid">

                <LivingRoom roomData={this.state.livingRoom}
                    userUID={this.props.userUID} />
                <BathRoom roomData={this.state.bathRoom}
                    userUID={this.props.userUID} />
                <Kithen roomData={this.state.kithen}
                    userUID={this.props.userUID} />
                <Bedroom roomData={this.state.bedRoom}
                    userUID={this.props.userUID} />
                <Hall roomData={this.state.hall}
                    userUID={this.props.userUID} />
            </svg>)
    }
}

export default Flat;


