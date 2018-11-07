import React, { Component } from 'react';
import * as d3 from 'd3';

import lightLogo from './light-on.svg';
import noLightLogo from './light-off.svg';

/*
const LIVINGROOM = 1;
const BEDROOM = 2;
const KITCHEN = 3;
const BATHROOM = 4;
const HALL = 5;
*/

class FlatView extends Component {
  constructor(props) {
    super(props);
    this.createFlatView = this.createFlatView.bind(this);

    //this.room = this.props.room;
    this.svg = this.parent_div;
  }

  componentDidMount() {
    this.createFlatView();
  }

  createFlatView() {
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

    this.drawLivingRoom(svg);
    this.drawHall(svg);
    this.drawBedRoom(svg);
    this.drawKitchen(svg);
    this.drawBathroom(svg);

    /*
        this.props.rooms.forEach(room => {
            switch (room.id) {
                case 1:
                    this.drawLivingRoom(svg);
                    //onclick
                    break;
                case 2:
                    this.drawBedRoom(svg);
                    break;
                case 3:
                    this.drawKitchen(svg);
                    break;
                case 4:
                    this.drawBathroom(svg);
                    break;
                case 5:
                    this.drawHall(svg);
                    break;
                default:
            }     
        });
 */
  }

  drawLivingRoom(svg) {
    let livingRoom = svg.append('g').attr('class', 'bar');

    livingRoom
      .append('rect')
      .attr('width', 300)
      .attr('height', 250)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'rgba(33,66,255,0.4)');

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
      .attr('fill', 'rgba(33,66,255,0.4)');

    livingRoom
      .append('path')
      .attr('d', 'M 0 500 L 200 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    //img
    svg
      .append('image')
      .attr('xlink:href', lightLogo)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 230)
      .attr('y', 20);

    d3.selectAll('g').on('click', function() {
      window.location.assign('/signin');
    });
  }

  drawBathroom(svg) {
    let BathRoom = svg.append('g').attr('class', 'bar');

    BathRoom.append('rect')
      .attr('width', 200)
      .attr('height', 150)
      .attr('x', 300)
      .attr('y', 0)
      .attr('fill', 'rgba(33,66,255,0.4)')
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', lightLogo)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 420)
      .attr('y', 20);

    d3.selectAll('image').on('click', function() {
      d3.select(this).attr('xlink:href', noLightLogo);
    });

    d3.selectAll('g').on('click', function() {
      window.location.assign('/signin');
    });
  }

  drawKitchen(svg) {
    let Kitchen = svg.append('g').attr('class', 'bar');

    Kitchen.append('rect')
      .attr('width', 200)
      .attr('height', 300)
      .attr('x', 500)
      .attr('y', 0)
      .attr('fill', 'rgba(33,66,255,0.4)')
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', lightLogo)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 620)
      .attr('y', 20);

    //click elements
    d3.selectAll('g').on('click', function() {
      window.location.assign('/signin');
    });

    d3.selectAll('image').on('click', function() {
      d3.select(this).attr('xlink:href', noLightLogo);
    });
  }

  drawBedRoom(svg) {
    let BedRoom = svg.append('g').attr('class', 'bar');

    BedRoom.append('rect')
      .attr('width', 300)
      .attr('height', 200)
      .attr('x', 400)
      .attr('y', 300)
      .attr('fill', 'rgba(33,66,255,0.4)')
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    svg
      .append('image')
      .attr('xlink:href', lightLogo)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 620)
      .attr('y', 320);

    d3.selectAll('g').on('click', function() {
      window.location.assign('/signin');
    });
  }

  drawHall(svg) {
    let hall = svg.append('g').attr('class', 'bar');

    hall
      .append('rect')
      .attr('width', 200)
      .attr('height', 100)
      .attr('x', 300)
      .attr('y', 150)
      .attr('fill', 'rgba(33,66,255,0.4)');

    hall
      .append('path')
      .attr('d', 'M 300 150 L 500 150')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    hall
      .append('path')
      .attr('d', 'M 300 150 L 300 250')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    hall
      .append('path')
      .attr('d', 'M 300 250 L 200 250')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    hall
      .append('path')
      .attr('d', 'M 200 250 L 200 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    hall
      .append('path')
      .attr('d', 'M 200 500 L 400 500')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.3);

    hall
      .append('rect')
      .attr('width', 300)
      .attr('height', 50)
      .attr('x', 200)
      .attr('y', 250)
      .attr('fill', 'rgba(33,66,255,0.4)');

    hall
      .append('rect')
      .attr('width', 200)
      .attr('height', 200)
      .attr('x', 200)
      .attr('y', 300)
      .attr('fill', 'rgba(33,66,255,0.4)');

    svg
      .append('image')
      .attr('xlink:href', lightLogo)
      .attr('width', 60)
      .attr('height', 60)
      .attr('x', 420)
      .attr('y', 170);

    d3.selectAll('g').on('click', function() {
      window.location.assign('/signin');
    });
  }

  render() {
    return <div id="flat-view" />;
  }
}
export default FlatView;
