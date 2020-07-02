import { hot } from "react-hot-loader/root";
import React from "react";
import FunctionComponent from "@components/FunctionComponent";

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <FunctionComponent name={"哈哈哈"} />
      <input></input>
    </div>
  );
}
export default hot(App);
