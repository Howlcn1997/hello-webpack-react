import React from "react";

const Expensive = (props) => {
  const { submit } = props;
  console.log("Expensive reRender");
  return (
    <div>
      This Is The Expensive
      <button onClick={submit}>Expensive Submit</button>
    </div>
  );
};

export default React.memo(Expensive);
