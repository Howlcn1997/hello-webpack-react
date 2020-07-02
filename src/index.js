import React from "react";
import ReactDOM from "react-dom";
import FunctionComponent from "@components/FunctionComponent";
import STYLES from "./index.module.scss";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <div className={STYLES.wrap}>-</div>
      <FunctionComponent name={"哈哈哈"} />
      <input></input>
    </div>
  );
}

// if (module.hot) {
//   module.hot.accept(() => {
//     ReactDom.render(<App />, document.getElementById("root"));
//   });
// }

ReactDOM.render(<App />, document.getElementById("root"));
