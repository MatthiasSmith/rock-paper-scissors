import React, { Fragment, useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import Button from '../button';
import MakeYourChoice from './make-your-choice';
import SelectedChoices from './selected-choices';
import GameResultsText from './game-results-text';
import { CHOICE_DATA, GAME_RESULTS } from '../../constants';

const StyledBoard = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;

  .play-area {
    height: 330px;
    width: 320px;

    .mb-1 {
      margin-bottom: 1rem;
    }

    button {
      margin: 0 auto;
    }
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 0;

    .play-area {
      height: 430px;
      min-width: 480px;
      width: unset;
    }
  }
`;

const Board = ({ onResultsGiven }) => {
  const [step, setStep] = useState(1);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const [results, setResults] = useState('');
  const [choiceCoords, setChoiceCoords] = useState({ x: 0, y: 0 });
  const playAreaRef = useRef(null);
  const playerChoiceRef = useRef(null);
  const resultsRef = useRef(null);

  const resetGame = () => {
    setStep(1);
    setChoiceCoords({ x: 0, y: 0 });
  };

  const handleSelect = (choice, coords) => {
    setChoiceCoords({ ...coords });
    gsap.to('.fade-out', {
      opacity: 0,
      onComplete: () => setStep(step + 1),
    });
    setPlayerChoice(choice);
  };

  const doStep2 = () => {
    setTimeout(() => {
      makeHouseChoice();
      setStep(step + 1);
    }, 1250);
  };

  useLayoutEffect(() => {
    if (step === 1) {
      gsap.fromTo(
        playAreaRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'back.out' }
      );
    }

    if (step === 3) {
      setTimeout(() => {
        const result = determineWinner();
        setResults(result);
        onResultsGiven(result);
        setStep(step + 1);
      }, 1500);
    }

    if (step === 4) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, [step]);

  const makeHouseChoice = () => {
    const rand = Math.ceil(Math.random() * 100) % 3;
    const choice = Object.keys(CHOICE_DATA).find(
      (item) => CHOICE_DATA[item].id === rand + 1
    );
    setHouseChoice(CHOICE_DATA[choice]);
  };

  const determineWinner = () => {
    let result = '';

    if (playerChoice === houseChoice) {
      result = GAME_RESULTS.DRAW;
    } else if (playerChoice === CHOICE_DATA.ROCK) {
      result =
        houseChoice === CHOICE_DATA.SCISSORS
          ? GAME_RESULTS.WIN
          : GAME_RESULTS.LOSE;
    } else if (playerChoice === CHOICE_DATA.PAPER) {
      result =
        houseChoice === CHOICE_DATA.ROCK ? GAME_RESULTS.WIN : GAME_RESULTS.LOSE;
    } else if (playerChoice === CHOICE_DATA.SCISSORS) {
      result =
        houseChoice === CHOICE_DATA.PAPER
          ? GAME_RESULTS.WIN
          : GAME_RESULTS.LOSE;
    }

    return result;
  };

  return (
    <StyledBoard className='board' step={step}>
      <div ref={playAreaRef} className='play-area flex-column'>
        {step === 1 ? (
          <MakeYourChoice onSelect={handleSelect} />
        ) : step === 2 ? (
          <SelectedChoices
            ref={playerChoiceRef}
            playerChoice={playerChoice}
            startingCoords={choiceCoords}
            onAnimateComplete={doStep2}
          />
        ) : step === 3 ? (
          <SelectedChoices
            ref={playerChoiceRef}
            playerChoice={playerChoice}
            houseChoice={houseChoice}
          />
        ) : (
          <Fragment>
            <SelectedChoices
              playerChoice={playerChoice}
              houseChoice={houseChoice}
              results={results}
              onPlayAgain={resetGame}
            />
            <div
              ref={resultsRef}
              className='hidden-gt-sm flex-column align-center'
            >
              <GameResultsText results={results} />
              <Button onClick={resetGame} primary>
                Play Again
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </StyledBoard>
  );
};

export default Board;
