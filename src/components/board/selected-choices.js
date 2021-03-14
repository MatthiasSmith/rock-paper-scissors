import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import ChoiceChip from '../choice-chip';
import GameResultsText from './game-results-text';
import Button from '../button';
import { gameResults } from '../../data/data';

const StyledSelectedChoices = styled.div`
  margin-bottom: 4rem;

  h3 {
    font-size: 0.95rem;
    font-weight: var(--font-weight-bold);
    margin-top: 1.5rem;
    letter-spacing: 2px;
  }

  .blank-choice {
    background-color: transparent;
    border-radius: 50%;
    height: var(--sm-chip-size);
    width: var(--sm-chip-size);
    position: relative;

    &::after {
      content: '';
      border-radius: 50%;
      background-color: hsl(218, 46%, 16%);
      height: var(--sm-chip-inner-size);
      width: var(--sm-chip-inner-size);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }

  @media screen and (min-width: 1024px) {
    min-width: 664px;

    h3 {
      font-size: 1.5rem;
      letter-spacing: 3px;
      margin-top: 0;
      margin-bottom: 4rem;
      order: 1;
    }

    .blank-choice {
      height: var(--lg-chip-size);
      width: var(--lg-chip-size);
      order: 2;

      ::after {
        height: var(--lg-chip-inner-size);
        width: var(--lg-chip-inner-size);
      }
    }

    .results-container {
      margin: 0 3.5rem;
      transform: scale(0);
    }
  }
`;

const StyledChoiceChip = styled(ChoiceChip)`
  @media screen and (min-width: 1024px) {
    order: 2;
  }
`;

const SelectedChoices = React.forwardRef(
  (
    {
      playerChoice,
      houseChoice,
      startingCoords,
      onAnimateComplete,
      results,
      onPlayAgain,
    },
    ref
  ) => {
    const houseChoiceRef = useRef(null);
    const resultsRef = useRef(null);
    const playerChoiceRef = useRef(null);

    useEffect(() => {
      if (!houseChoice) {
        gsap.to(ref.current.querySelectorAll('.fade-in'), {
          opacity: 1,
          delay: 0.75,
          duration: 0.5,
        });

        gsap.to(ref.current.querySelector(`[title=${playerChoice.title}]`), {
          x: 0,
          y: 0,
          ease: 'power1.in',
          duration: 0.4,
          onComplete: () => onAnimateComplete(),
        });
      } else {
        gsap.to(houseChoiceRef.current, {
          scale: 1,
          duration: 0.5,
          ease: 'back.out',
        });
      }
    }, [houseChoice]);

    return (
      <StyledSelectedChoices
        ref={ref}
        className='flex-row space-between align-center'
      >
        <div className='flex-column align-center'>
          <StyledChoiceChip
            ref={playerChoiceRef}
            className='choice-chip'
            choice={playerChoice}
            coords={startingCoords}
            showCircles={results === gameResults.WIN}
          />
          <h3 className='fade-in'>You picked</h3>
        </div>
        {results ? (
          <div
            ref={resultsRef}
            className='hidden-sm flex-column align-center results-container'
          >
            <GameResultsText results={results} />
            <Button onClick={onPlayAgain} primary>
              Play Again
            </Button>
          </div>
        ) : null}
        <div className='flex-column align-center fade-in'>
          {houseChoice ? (
            <StyledChoiceChip
              className='choice-chip'
              ref={houseChoiceRef}
              choice={houseChoice}
              scaleUp={true}
              showCircles={results === gameResults.LOSE}
            />
          ) : (
            <div className='blank-choice'></div>
          )}
          <h3>The house picked</h3>
        </div>
      </StyledSelectedChoices>
    );
  }
);

export default SelectedChoices;
