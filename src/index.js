import React from 'react';
import ReactDOM from 'react-dom';

import ReducedMotionProvider from './providers/reduced-motion-provider';
import BonusGameProvider from './providers/bonus-game-provider';
import App from './App';

ReactDOM.render(
  <ReducedMotionProvider>
    <BonusGameProvider>
      <App />
    </BonusGameProvider>
  </ReducedMotionProvider>,
  document.getElementById('root')
);
