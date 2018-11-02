import React, { Component } from "react";
import * as d3 from "d3";

import lightLogo from "./light-on.svg";
import noLightLogo from "./light-off.svg";

//import { firebase } from "../../../firebase";
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

    // this.room = this.props.room;
    this.svg = this.parent_div;
    /*
        this.state = {
            svg:this.parent_div
        }
        */
  }

  componentDidMount() {
    this.createFlatView();
  }
  componentDidUpdate() {
    this.createFlatView();
  }
  createFlatView() {
    var parent_div = d3.select("#flat-view").append("div");

    parent_div
      .style("width", "100%")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("height", "500px");

    var svg = parent_div
      .append("svg")
      .attr("viewBox", "0 0 700 500")
      .attr("preserveAspectRatio", "xMidYMid")
      .style("width", "80%");

    svg.style("background-color", "rgba(0,0,0,0.08)");

    this.drawLivingRoom(svg);
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
    let livingRoom = svg.append("g");

    livingRoom
      .append("rect")
      .attr("width", 300)
      .attr("height", 250)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "rgba(33,66,255,0.4)")
      .attr("stroke-width", 1)
      .attr("stroke", "#000");

    livingRoom
      .append("rect")
      .attr("width", 200)
      .attr("height", 300)
      .attr("x", 0)
      .attr("y", 250)
      .attr("fill", "rgba(33,66,255,0.4)")
      .attr("stroke-width", 1)
      .attr("stroke", "#000");

    //img
    var g = svg.append("g");

    g.append("svg:image")
      .attr("xlink:href", lightLogo)
      .attr("width", 70)
      .attr("height", 70)
      .attr("x", 60)
      .attr("y", 200);
  }

  drawBathroom(svg) {
    svg
      .append("rect")
      .attr("width", 200)
      .attr("height", 150)
      .attr("x", 300)
      .attr("y", 0)
      .attr("fill", "rgba(33,66,255,0.4)")
      .attr("stroke-width", 1)
      .attr("stroke", "#000");

    var g2 = svg.append("g");

    g2.append("svg:image")
      .attr("xlink:href", lightLogo)
      .attr("width", 70)
      .attr("height", 70)
      .attr("x", 350)
      .attr("y", 70);

    d3.selectAll("image").on("click", function() {
      d3.select(this).attr("xlink:href", noLightLogo);
    });
  }

  drawKitchen(svg) {
    svg
      .append("rect")
      .attr("width", 200)
      .attr("height", 300)
      .attr("x", 500)
      .attr("y", 0)
      .attr("fill", "rgba(33,66,255,0.4)")
      .attr("stroke-width", 1)
      .attr("stroke", "#000");
  }

  drawBedRoom(svg) {
    svg
      .append("rect")
      .attr("width", 300)
      .attr("height", 250)
      .attr("x", 400)
      .attr("y", 300)
      .attr("fill", "rgba(33,66,255,0.4)")
      .attr("stroke-width", 1)
      .attr("stroke", "#000");

    var g3 = svg.append("g");

    g3.append("svg:image")
      .attr("xlink:href", lightLogo)
      .attr("width", 70)
      .attr("height", 70)
      .attr("x", 560)
      .attr("y", 400);
  }

  drawHall(svg) {
    let hall = svg.append("g");

    hall
      .append("rect")
      .attr("width", 200)
      .attr("height", 100)
      .attr("x", 300)
      .attr("y", 150)
      .attr("fill", "rgb(123,104,238)")
      .attr("stroke-width", 1)
      .attr("stroke", "rgb(123,104,238)");

    hall
      .append("rect")
      .attr("width", 300)
      .attr("height", 50)
      .attr("x", 200)
      .attr("y", 250)
      .attr("fill", "rgb(123,104,238)")
      .attr("stroke-width", 1)
      .attr("stroke", "rgb(123,104,238)");

    hall
      .append("rect")
      .attr("width", 200)
      .attr("height", 250)
      .attr("x", 200)
      .attr("y", 300)
      .attr("fill", "rgb(123,104,238)")
      .attr("stroke-width", 1)
      .attr("stroke", "rgb(123,104,238)");
  }

  render() {
    return <div id="flat-view" />;
  }
}
export default FlatView;
