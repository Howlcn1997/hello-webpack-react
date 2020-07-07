import React from "react";
import { Link } from "react-router-dom";
import Fun from "../FunctionComponent";

export default () => {
  return (
    <div>
      <Fun />
      This Is The A Component <Link to="/b">Link To B</Link>
    </div>
  );
};
