import React, { Component } from "react";

import BgImage from "../../../../assets/img/blur-flat.jpg";

class FlatWievLoader extends Component {
  render() {
    return (
      <div className="flat-view-loader">
        <img src={BgImage} alt="loader" />
      </div>
    );
  }
}

export default FlatWievLoader;
