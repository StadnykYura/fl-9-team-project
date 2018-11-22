import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="flat-view-loader">
        <section className="talign-center">
          <div className="spinner icon-spinner-5" aria-hidden="true" />
        </section>
      </div>
    );
  }
}

export default Loader;
