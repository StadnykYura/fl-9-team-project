import React, { Component } from "react";
// import logo from "../logo.svg";
import HomepageNav from "./homepage-nav-top/homepage-nav-top";
// import "../styles/index.scss";
import HomepageNavBottom from "./homepage-nav-bottom/homepage-nav-bottom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomepageNav />
        <HomepageNavBottom />
      </div>
    );
  }
}

export default App;
