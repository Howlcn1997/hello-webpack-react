import React, { Suspense, lazy } from "react";

const withLazy = (lazyLoader) => {
  const LazyComponent = lazy(lazyLoader);
  return (props) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazy;
