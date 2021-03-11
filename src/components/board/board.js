import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import Triangle from '../../../public/images/bg-triangle.svg';
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
  width: 100%;

  .play-area {
    background-image: ${(props) =>
      props.step === 1 ? `url(${Triangle})` : 'none'};
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 3rem;
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

  const resetGame = () => {
    setStep(1);
  };

  const handleSelection = (choice) => {
    setStep(step + 1);
    setPlayerChoice(choice);
  };

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        makeHouseChoice();
        setStep(step + 1);
      }, 1500);
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
      <div className='play-area flex-column'>
        {step === 1 ? (
          <MakeYourChoice onSelect={handleSelection} />
        ) : step === 2 ? (
          <SelectedChoices playerChoice={playerChoice} />
        ) : step === 3 ? (
          <SelectedChoices
            playerChoice={playerChoice}
            houseChoice={houseChoice}
          />
        ) : (
          <Fragment>
            <SelectedChoices
              playerChoice={playerChoice}
              houseChoice={houseChoice}
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
