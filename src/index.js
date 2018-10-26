import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

const a = {
  a: 1
};
a.a++;
serviceWorker.unregister();
