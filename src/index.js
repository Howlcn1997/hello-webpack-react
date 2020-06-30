import React from "react";
import ReactDOM from "react-dom";
import STYLES from "./index.module.scss";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <div className={STYLES.wrap}>-</div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
