import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import FunctionComponent from "@components/FunctionComponent";

function App() {
  const [name, setName] = useState("王五");
  return (
    <div>
      <h1>Hello React</h1>
      <FunctionComponent name={name} />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
    </div>
  );
}
export default hot(App);
