import React, { lazy, Suspense } from 'react';

const LazyVerify = lazy(() => import('./Verify'));

const Verify = props => (
  <Suspense fallback={null}>
    <LazyVerify {...props} />
  </Suspense>
);

export default Verify;
