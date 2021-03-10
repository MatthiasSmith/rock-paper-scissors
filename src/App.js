import React, { Fragment } from 'react';

import GlobalStyles from './global-styles';

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />
      Rock Paper Scissors app
      <div>
        Score Rules You Picked The House Picked You Win You Lose Play Again
      </div>
      <div class='attribution'>
        Challenge by{' '}
        <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
          Frontend Mentor
        </a>
        . Coded by <a href='#'>Your Name Here</a>.
      </div>
    </Fragment>
  );
};

export default App;
