import React, { Component } from 'react';
import * as d3 from 'd3';
import { withRouter } from 'react-router-dom';

import { firebase } from '../../../firebase';

import lightLogo from '../../../assets/icons/light-bulb-on.svg';
import noLightLogo from '../../../assets/icons/light-bulb-off.svg';

import * as roomsID from '../../../constants/roomsID';

class FlatView extends Component {
  componentDidMount() {
    this.createFlatView();
  }

  createFlatView() {
    const { roomsData } = this.props;

    var parent_div = d3.select('#flat-view').append('div');

    parent_div
      .style('width', '100%')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .style('height', '500px');

    var svg = parent_div

      .append('svg')
      .attr('viewBox', '0 0 700 500')
      .attr('preserveAspectRatio', 'xMidYMid')
      .style('width', '80%');

    if (roomsData) {
      // if not null
      roomsData.forEach(room => {
        switch (room.roomID) {
          case roomsID.LIVINGROOM:
            this.drawLivingRoom(
              svg,
              roomsID.LIVINGROOM,
              room.roomInfo.name,
              room.roomInfo.turnOnOffLight
            );
            break;
          case roomsID.BEDROOM:
            this.drawBedRoom(
              svg,
              roomsID.BEDROOM,
              room.roomInfo.name,
              room.roomInfo.turnOnOffLight
            );
            break;
          case roomsID.KITCHEN:
            this.drawKitchen(
              svg,
              roomsID.KITCHEN,
              room.roomInfo.name,
              room.roomInfo.turnOnOffLight
            );
            break;
          case roomsID.BATHROOM:
            this.drawBathroom(
              svg,
              roomsID.BATHROOM,
              room.roomInfo.name,
              room.roomInfo.turnOnOffLight
            );
            break;
          case roomsID.HALL:
            this.drawHall(
              svg,
              roomsID.HALL,
              room.roomInfo.name,
              room.roomInfo.turnOnOffLight
            );
            break;
          default:
        }
      });
    }
  }

  drawLivingRoom(svg, roomID, name, isLightOn) {
    let livingRoom = svg
      .append('g')
      .attr('class', 'bar')
      .attr('id', 'livingRoom');
    livingRoom
      .append('text')
      .text(`${name}`)
      .attr('class', 'room-title')
      .attr('dy', '-40')
      .attr('dx', '-380')
      .attr('transform', 'translate(480,250)');

    livingRoom
      .append('rect')
      .attr('width', 300)
      .attr('height', 250)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'rgba(130,150,255,0.4)');

    livingRoom
      .append('path')
      .attr('d', 'M 0 0 L 0 500')
      .attr('stroke', 'black');

    livingRoom
      .append('path')
      .attr('d', 'M 0 0 L 300 0')
      .attr('stroke', 'black');

    livingRoom
      .append('rect')
      .attr('width', 199)
      .attr('height', 250)
      .attr('x', 0)
      .attr('y', 250)
      .attr('fill', 'rgba(130,150,255,0.4)');

    livingRoom
      .append('path')
      .attr('d', 'M 0 500 L 200 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    //img
    svg
      .append('image')
      .attr('xlink:href', isLightOn ? lightLogo : noLightLogo)
      .attr('id', `light-${roomID}`)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 220)
      .attr('y', 20);

    d3.selectAll('#livingRoom').on('click', () => {
      this.props.history.push(`room/${roomID}`);
    });

    d3.select(`#light-${roomID}`).on('click', () => {
      debugger;
      const target = d3.event.target;
      this.turnOnOffLightInRoom(target, roomID);
    });
  }

  drawBathroom(svg, roomID, name, isLightOn) {
    let BathRoom = svg
      .append('g')
      .attr('class', 'bar')
      .attr('id', 'BathRoom');

    BathRoom.append('text')
      .text(`${name}`)
      .attr('class', 'room-title')
      .attr('dy', '-140')
      .attr('dx', '-120')
      .attr('transform', 'translate(480,250)');

    BathRoom.append('rect')
      .attr('width', 200)
      .attr('height', 150)
      .attr('x', 300)
      .attr('y', 0)
      .attr('fill', 'rgba(130,150,255,0.4)')

      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', isLightOn ? lightLogo : noLightLogo)
      .attr('id', `light-${roomID}`)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 420)
      .attr('y', 20);

    d3.selectAll('#BathRoom').on('click', () => {
      this.props.history.push(`room/${roomID}`);
    });

    d3.select(`#light-${roomID}`).on('click', () => {
      const target = d3.event.target;
      this.turnOnOffLightInRoom(target, roomID);
    });
  }

  drawKitchen(svg, roomID, name, isLightOn) {
    let Kitchen = svg
      .append('g')
      .attr('class', 'bar')
      .attr('id', 'Kitchen');

    Kitchen.append('text')
      .text(`${name}`)
      .attr('class', 'room-title')
      .attr('dy', '-100')
      .attr('dx', '90')
      .attr('transform', 'translate(480,250)');

    Kitchen.append('rect')
      .attr('width', 200)
      .attr('height', 300)
      .attr('x', 500)
      .attr('y', 0)
      .attr('fill', 'rgba(130,150,255,0.4)')

      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', isLightOn ? lightLogo : noLightLogo)
      .attr('id', `light-${roomID}`)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 620)
      .attr('y', 20);

    d3.selectAll('#Kitchen').on('click', () => {
      this.props.history.push(`room/${roomID}`);
    });

    d3.select(`#light-${roomID}`).on('click', () => {
      const target = d3.event.target;
      this.turnOnOffLightInRoom(target, roomID);
    });

    // d3.selectAll('#Kitchen').on('click', function() {
    //   d3.select(this).attr('xlink:href', noLightLogo);
    // });
  }

  drawBedRoom(svg, roomID, name, isLightOn) {
    let BedRoom = svg
      .append('g')
      .attr('class', 'bar')
      .attr('id', 'BedRoom');

    BedRoom.append('text')
      .text(`${name}`)
      .attr('class', 'room-title')
      .attr('dy', '150')
      .attr('dx', '10')
      .attr('transform', 'translate(480,250)');

    BedRoom.append('rect')
      .attr('width', 300)
      .attr('height', 200)
      .attr('x', 400)
      .attr('y', 300)
      .attr('fill', 'rgba(130,150,255,0.4)')

      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', isLightOn ? lightLogo : noLightLogo)
      .attr('id', `light-${roomID}`)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 620)
      .attr('y', 320);

    d3.selectAll('#BedRoom').on('click', () => {
      this.props.history.push(`room/${roomID}`);
    });

    d3.select(`#light-${roomID}`).on('click', () => {
      const target = d3.event.target;
      this.turnOnOffLightInRoom(target, roomID);
    });
  }

  drawHall(svg, roomID, name, isLightOn) {
    let Hall = svg
      .append('g')
      .attr('class', 'bar')
      .attr('id', 'Hall');

    Hall.append('text')
      .text(`${name}`)
      .attr('class', 'room-title')
      .attr('dy', '120')
      .attr('dx', '-210')
      .attr('transform', 'translate(480,250)');

    Hall.append('rect')

      .attr('width', 200)
      .attr('height', 100)
      .attr('x', 300)
      .attr('y', 150)
      .attr('fill', 'rgba(130,150,255,0.4)');

    Hall.append('path')

      .attr('d', 'M 300 150 L 500 150')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    Hall.append('path')

      .attr('d', 'M 300 150 L 300 250')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    Hall.append('path')

      .attr('d', 'M 300 250 L 200 250')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    Hall.append('path')

      .attr('d', 'M 200 250 L 200 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    Hall.append('path')

      .attr('d', 'M 200 500 L 400 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    Hall.append('rect')

      .attr('width', 300)
      .attr('height', 50)
      .attr('x', 200)
      .attr('y', 250)
      .attr('fill', 'rgba(130,150,255,0.4)');

    Hall.append('rect')

      .attr('width', 200)
      .attr('height', 200)
      .attr('x', 200)
      .attr('y', 300)
      .attr('fill', 'rgba(130,150,255,0.4)');

    svg
      .append('image')
      .attr('xlink:href', isLightOn ? lightLogo : noLightLogo)
      .attr('id', `light-${roomID}`)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 420)
      .attr('y', 170);

    d3.selectAll('#Hall').on('click', () => {
      this.props.history.push(`room/${roomID}`);
    });

    d3.select(`#light-${roomID}`).on('click', () => {
      const target = d3.event.target;
      this.turnOnOffLightInRoom(target, roomID);
    });
  }

  turnOnOffLightInRoom = (target, roomId) => {
    const uid = this.props.userUID;
    if (uid) {
      let roomRef = firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .doc(roomId);

      roomRef
        .get()
        .then(function(doc) {
          let currentLightState = doc.data().turnOnOffLight;
          roomRef
            .update({
              turnOnOffLight: !currentLightState,
            })
            .then(function() {
              target.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'href',
                !currentLightState ? lightLogo : noLightLogo
              );
            });
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
    }
  };

  render() {
    return <div id="flat-view" />;
  }
}
export default withRouter(FlatView);
