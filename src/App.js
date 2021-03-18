import React, {
  Fragment,
  useState,
  useLayoutEffect,
  useRef,
  useContext,
} from 'react';

import GlobalStyles from './global-styles';
import Header from './components/header/header';
import Button from './components/button';
import Board from './components/board/board';
import Attribution from './components/attribution';
import RulesDialog from './components/rules-dialog';
import BottomButtonRow from './components/bottom-button-row';
import ReducedMotionToggle from './components/reduced-motion-toggle';
import { GAME_RESULTS } from './constants';
import { BonusGameContext } from './providers/bonus-game-provider';

const App = () => {
  const [score, setScore] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isBonusGame, setBonusGame } = useContext(BonusGameContext);
  const rulesButtonRef = useRef(null);

  useLayoutEffect(() => {
    const storedScore = localStorage.getItem('score');
    storedScore ? setScore(parseInt(storedScore, 10)) : () => {};
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    rulesButtonRef.current.focus();
  };

  const handleResultsGiven = (result) => {
    const newScore =
      result === GAME_RESULTS.WIN
        ? score + 1
        : result === GAME_RESULTS.LOSE
        ? score - 1 < 0
          ? score
          : score - 1
        : score;
    setScore(newScore);
    localStorage.setItem('score', newScore);
  };

  const changeMode = () => {
    setBonusGame(!isBonusGame);
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
          <Board onResultsGiven={handleResultsGiven} />
          <BottomButtonRow>
            <Button onClick={changeMode} lessPadding>
              Change Game
            </Button>
            <Button ref={rulesButtonRef} onClick={openDialog}>
              Rules
            </Button>
          </BottomButtonRow>
          <ReducedMotionToggle />
          <Attribution />
        </div>
        <RulesDialog isOpen={isDialogOpen} onClose={closeDialog} />
      </React.StrictMode>
    </Fragment>
  );
};

export default App;
