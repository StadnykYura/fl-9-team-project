import React, { Component } from "react";
// import logo from "../logo.svg";
import HomepageNav from "./homepage-nav-top/homepage-nav-top";
// import "../styles/index.scss";
import HomepageNavBottom from "./homepage-nav-bottom/homepage-nav-bottom";
import FlatView from "./home-page/flat-view/flat-view";

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <HomepageNav />
        <FlatView />
        <HomepageNavBottom />
      </div>
    );
  }
}

export default HomePage;
