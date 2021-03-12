import React, { Fragment, useState } from 'react';

import GlobalStyles from './global-styles';
import Header from './components/header/header';
import Button from './components/button';
import Board from './components/board/board';
import Attribution from './components/attribution';
import RulesDialog from './components/rules-dialog';
import { gameResults } from './data/data';

const App = () => {
  const [score, setScore] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
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
      <Header score={score} />
      <Board onResultsGiven={handleResultsGiven} />
      <div
        className='flex-1 flex-column'
        css={`
          margin-bottom: 2.5rem;
          justify-content: flex-end;
        `}
      >
        <Button onClick={openDialog}>Rules</Button>
      </div>
      <Attribution />
      <RulesDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </Fragment>
  );
};

export default App;
