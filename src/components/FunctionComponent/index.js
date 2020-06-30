import React, { useState, useCallback } from "react";

export default (props) => {
  const { name = "function component" } = props;
  const [count, setCount] = useState(0);
  return (
    <div>
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
