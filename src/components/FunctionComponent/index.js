import React, { useState } from "react";
import STYLES from "./index.module.scss";

export default (props) => {
  const { name = "function component" } = props;
  const [count, setCount] = useState(0);
  sss
  return (
    <div className={STYLES.wrap}>
      <div>This is a {name}</div>
      <div>Count ==> {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </div>
  );
};
