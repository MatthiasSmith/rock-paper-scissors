import React from 'react';
import ReactDOM from 'react-dom';

import ReducedMotionProvider from './providers/reduced-motion-provider';
import App from './App';

ReactDOM.render(
  <ReducedMotionProvider>
    <App />
  </ReducedMotionProvider>,
  document.getElementById('root')
);
