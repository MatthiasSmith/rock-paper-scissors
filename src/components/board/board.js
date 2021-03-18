import React, { Fragment, useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import Button from '../button';
import MakeYourChoice from './make-your-choice';
import SelectedChoices from './selected-choices';
import GameResultsText from './game-results-text';
import { CHOICE_DATA, GAME_RESULTS, LG_BREAKPOINT } from '../../constants';

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

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    margin-bottom: 0;

    .play-area {
      height: 430px;
      min-width: 480px;
      width: unset;
    }
  }
`;

const Board = ({ onResultsGiven, isBonusGame, isReducedMotion }) => {
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
      duration: !isReducedMotion ? 0.5 : 0,
      onComplete: () => {
        setPlayerChoice(choice);
        setStep(step + 1);
      },
    });
  };

  const doStep2 = () => {
    setTimeout(() => {
      makeHouseChoice();
      setStep(step + 1);
    }, 1250);
  };

  useLayoutEffect(() => {
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
        { opacity: 1, duration: !isReducedMotion ? 0.5 : 0 }
      );
    }
  }, [step]);

  const makeHouseChoice = () => {
    const rand = Math.ceil(Math.random() * 100) % (isBonusGame ? 5 : 3);
    const choice = Object.keys(CHOICE_DATA).find(
      (item) => CHOICE_DATA[item].id === rand + 1
    );
    setHouseChoice(CHOICE_DATA[choice]);
  };

  const determineWinner = () => {
    let result = '';

    if (isBonusGame) {
      switch (playerChoice) {
        case houseChoice:
          result = GAME_RESULTS.DRAW;
          break;
        case CHOICE_DATA.ROCK:
          result =
            houseChoice === CHOICE_DATA.SCISSORS ||
            houseChoice === CHOICE_DATA.LIZARD
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.PAPER:
          result =
            houseChoice === CHOICE_DATA.ROCK ||
            houseChoice === CHOICE_DATA.SPOCK
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.SCISSORS:
          result =
            houseChoice === CHOICE_DATA.PAPER ||
            houseChoice === CHOICE_DATA.LIZARD
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.LIZARD:
          result =
            houseChoice === CHOICE_DATA.PAPER ||
            houseChoice === CHOICE_DATA.SPOCK
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.SPOCK:
          result =
            houseChoice === CHOICE_DATA.SCISSORS ||
            houseChoice === CHOICE_DATA.ROCK
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        default:
          break;
      }
    } else {
      switch (playerChoice) {
        case houseChoice:
          result = GAME_RESULTS.DRAW;
          break;
        case CHOICE_DATA.ROCK:
          result =
            houseChoice === CHOICE_DATA.SCISSORS
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.PAPER:
          result =
            houseChoice === CHOICE_DATA.ROCK
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        case CHOICE_DATA.SCISSORS:
          result =
            houseChoice === CHOICE_DATA.PAPER
              ? GAME_RESULTS.WIN
              : GAME_RESULTS.LOSE;
          break;
        default:
          break;
      }
    }

    return result;
  };

  return (
    <StyledBoard className='board' step={step}>
      <div className='play-area flex-column'>
        {step === 1 ? (
          <MakeYourChoice
            onSelect={handleSelect}
            isBonusGame={isBonusGame}
            isReducedMotion={isReducedMotion}
          />
        ) : step === 2 ? (
          <SelectedChoices
            ref={playerChoiceRef}
            playerChoice={playerChoice}
            startingCoords={choiceCoords}
            onAnimateComplete={doStep2}
            isBonusGame={isBonusGame}
            isReducedMotion={isReducedMotion}
          />
        ) : step === 3 ? (
          <SelectedChoices
            ref={playerChoiceRef}
            playerChoice={playerChoice}
            houseChoice={houseChoice}
            isBonusGame={isBonusGame}
            isReducedMotion={isReducedMotion}
          />
        ) : (
          <Fragment>
            <SelectedChoices
              playerChoice={playerChoice}
              houseChoice={houseChoice}
              results={results}
              onPlayAgain={resetGame}
              isBonusGame={isBonusGame}
              isReducedMotion={isReducedMotion}
            />
            <div
              ref={resultsRef}
              className='hidden-gt-sm flex-column align-center'
              role='alert'
              aria-live='polite'
              aria-atomic='true'
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
