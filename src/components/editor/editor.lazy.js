import React, { lazy, Suspense } from 'react';

const Lazyeditor = lazy(() => import('./editor'));

const editor = props => (
  <Suspense fallback={null}>
    <Lazyeditor {...props} />
  </Suspense>
);

export default editor;
