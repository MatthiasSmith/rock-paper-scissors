import React, { Fragment, useState, useRef } from 'react';

import GlobalStyles from './global-styles';
import Header from './components/header/header';
import Button from './components/button';
import Board from './components/board/board';
import Attribution from './components/attribution';
import RulesDialog from './components/rules-dialog';
import { gameResults } from './data/data';
import BottomButtonRow from './components/bottom-button-row';

const App = () => {
  const [score, setScore] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const rulesButtonRef = useRef(null);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    rulesButtonRef.current.focus();
  };

  const handleResultsGiven = (result) => {
    setScore(
      result === gameResults.WIN
        ? score + 1
        : result === gameResults.LOSE
        ? score - 1 < 0
          ? score
          : score - 1
        : score
    );
  };

  return (
    <Fragment>
      <GlobalStyles />
      <div
        tabIndex={isDialogOpen ? '-1' : undefined}
        className='container flex-column align-center flex-1'
      >
        <Header score={score} />
        <Board onResultsGiven={handleResultsGiven} />
        <BottomButtonRow>
          <Button ref={rulesButtonRef} onClick={openDialog}>
            Rules
          </Button>
        </BottomButtonRow>
        <Attribution />
      </div>
      <RulesDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </Fragment>
  );
};

export default App;
