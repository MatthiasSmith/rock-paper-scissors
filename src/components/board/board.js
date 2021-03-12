import React, { Fragment, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import Button from '../button';
import MakeYourChoice from './make-your-choice';
import SelectedChoices from './selected-choices';
import GameResultsText from './game-results-text';
import { gameChoiceData, gameResults } from '../../data/data';

const StyledBoard = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  width: 100%;

  .play-area {
    height: 330px;
    width: 319px;

    .mb-1 {
      margin-bottom: 1rem;
    }

    button {
      margin: 0 auto;
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
  const makeYourChoiceRef = useRef(null);
  const playerChoiceRef = useRef(null);

  const resetGame = () => {
    setStep(1);
    setChoiceCoords({ x: 0, y: 0 });
  };

  const handleSelect = (choice) => {
    if (choice.id !== gameChoiceData.PAPER.id) {
      const choiceChipEl = makeYourChoiceRef.current.querySelector(
        `[title="${choice.title}"]`
      );
      if (choiceChipEl) {
        const paperChoiceEl = makeYourChoiceRef.current.querySelector(
          `[title="paper"]`
        );
        const choicePos = choiceChipEl.getBoundingClientRect();
        const paperPos = paperChoiceEl.getBoundingClientRect();
        setChoiceCoords({
          x: choicePos.x - paperPos.x,
          y: choicePos.y - paperPos.y,
        });
      }
    }

    gsap.to(makeYourChoiceRef.current.querySelectorAll('.fade-out'), {
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

  useEffect(() => {
    const duration = 0.4;

    if (step === 1) {
      gsap.fromTo(
        playAreaRef.current,
        { scale: 0 },
        { scale: 1, duration: duration, ease: 'back.out' }
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
  }, [step]);

  const makeHouseChoice = () => {
    const rand = Math.ceil(Math.random() * 100) % 3;
    const choice = Object.keys(gameChoiceData).find(
      (item) => gameChoiceData[item].id === rand + 1
    );
    setHouseChoice(gameChoiceData[choice]);
  };

  const determineWinner = () => {
    let result = '';

    if (playerChoice === houseChoice) {
      result = gameResults.DRAW;
    } else if (playerChoice === gameChoiceData.ROCK) {
      result =
        houseChoice === gameChoiceData.SCISSORS
          ? gameResults.WIN
          : gameResults.LOSE;
    } else if (playerChoice === gameChoiceData.PAPER) {
      result =
        houseChoice === gameChoiceData.ROCK
          ? gameResults.WIN
          : gameResults.LOSE;
    } else if (playerChoice === gameChoiceData.SCISSORS) {
      result =
        houseChoice === gameChoiceData.PAPER
          ? gameResults.WIN
          : gameResults.LOSE;
    }

    return result;
  };

  return (
    <StyledBoard className='board' step={step}>
      <div ref={playAreaRef} className='play-area flex-column'>
        {step === 1 ? (
          <MakeYourChoice ref={makeYourChoiceRef} onSelect={handleSelect} />
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
            />
            <GameResultsText results={results} />
            <Button onClick={resetGame} primary>
              Play Again
            </Button>
          </Fragment>
        )}
      </div>
    </StyledBoard>
  );
};

export default Board;
