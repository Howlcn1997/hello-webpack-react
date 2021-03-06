import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

console.log("isHot", module.hot);
//  热更新
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
