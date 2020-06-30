import React from "react";

export default (props) => {
  const { name = "function component" } = props;
  return <div>This is a {name}</div>;
};