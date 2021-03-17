import React, { Fragment, useState, useLayoutEffect, useRef } from 'react';

import GlobalStyles from './global-styles';
import Header from './components/header/header';
import Button from './components/button';
import Board from './components/board/board';
import Attribution from './components/attribution';
import RulesDialog from './components/rules-dialog';
import BottomButtonRow from './components/bottom-button-row';
import ReducedMotionToggle from './components/reduced-motion-toggle';
import { GAME_RESULTS } from './constants';

const App = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [score, setScore] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const rulesButtonRef = useRef(null);

  useLayoutEffect(() => {
    const hasOSReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const storedReducedMotion = localStorage.getItem('reducedMotion');
    setIsReducedMotion(
      !storedReducedMotion ? hasOSReducedMotion : storedReducedMotion === 'true'
    );
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    rulesButtonRef.current.focus();
  };

  const handleResultsGiven = (result) => {
    setScore(
      result === GAME_RESULTS.WIN
        ? score + 1
        : result === GAME_RESULTS.LOSE
        ? score - 1 < 0
          ? score
          : score - 1
        : score
    );
  };

  const handleReducedMotionChange = () => {
    setIsReducedMotion(!isReducedMotion);
    localStorage.setItem('reducedMotion', !isReducedMotion);
  };

  return (
    <Fragment>
      <React.StrictMode>
        <GlobalStyles />
        <div
          tabIndex={isDialogOpen ? '-1' : undefined}
          className='container flex-column align-center flex-1'
        >
          <Header score={score} />
          <Board
            onResultsGiven={handleResultsGiven}
            isReducedMotion={isReducedMotion}
          />
          <BottomButtonRow>
            <Button ref={rulesButtonRef} onClick={openDialog}>
              Rules
            </Button>
          </BottomButtonRow>
          <ReducedMotionToggle
            onChange={handleReducedMotionChange}
            isReducedMotion={isReducedMotion}
          />
          <Attribution />
        </div>
        <RulesDialog
          isOpen={isDialogOpen}
          isReducedMotion={isReducedMotion}
          onClose={closeDialog}
        />
      </React.StrictMode>
    </Fragment>
  );
};

export default App;
