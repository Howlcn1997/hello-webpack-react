import React from "react";
import ReactDOM from "react-dom";
import M_css from "./css.css";
import M_cssModule from "./cssModule.module.css";
import M_less from "./less.less";
import M_lessModule from "./lessModule.module.less";
import M_sass from "./sass.scss";
import M_sassModule from "./sassModule.module.scss";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <div className={M_css.wrap}>-</div>
      <div className={M_cssModule.wrap}>-</div>
      <div className={M_less.wrap}>-</div>
      <div className={M_lessModule.wrap}>-</div>
      <div className={M_sass.wrap}>-</div>
      <div className={M_sassModule.wrap}>-</div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
