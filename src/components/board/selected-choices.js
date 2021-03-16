import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import ChoiceChip from '../choice-chip';
import GameResultsText from './game-results-text';
import Button from '../button';
import {
  GAME_RESULTS,
  DESKTOP_BREAKPOINT,
  DESKTOP_CHOICE_SIZE,
  DESKTOP_CHOICE_SCALE,
} from '../../constants';

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

  @media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
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
      width: 218px;
    }
  }
`;

const StyledChoiceChip = styled(ChoiceChip)`
  @media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
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
    const isSmScreen =
      document.documentElement.clientWidth < DESKTOP_BREAKPOINT;

    useLayoutEffect(() => {
      if (!houseChoice) {
        gsap.fromTo(
          '.fade-in',
          { opacity: 0 },
          {
            opacity: 1,
            delay: 0.75,
            duration: 0.5,
          }
        );

        gsap.fromTo(
          playerChoiceRef.current,
          {
            x: isSmScreen
              ? startingCoords.x
              : startingCoords.x +
                calcXOffset(DESKTOP_CHOICE_SIZE, DESKTOP_CHOICE_SCALE),
            y: isSmScreen
              ? startingCoords.y
              : startingCoords.y -
                calcYOffset(
                  DESKTOP_CHOICE_SIZE,
                  DESKTOP_CHOICE_SIZE,
                  DESKTOP_CHOICE_SCALE
                ),
            scale: isSmScreen && !houseChoice ? 1 : DESKTOP_CHOICE_SCALE,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            ease: 'power1.in',
            duration: 0.4,
            onComplete: () => onAnimateComplete(),
          }
        );
      } else {
        const tl = gsap.timeline({ defaultDuration: 0.3 });
        tl.fromTo(
          houseChoiceRef.current,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out',
          }
        );
        if (!isSmScreen) {
          tl.to('.player-container', { x: -133, ease: 'power1.out' }, '+=0.3');
          tl.to('.house-container', { x: 133, ease: 'power1.out' }, '-=0.5');
        }
      }
    }, [houseChoice]);

    useLayoutEffect(() => {
      if (!results) return;
      gsap.set(['.player-container', '.house-container'], { x: 0 });
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.out', duration: 0.4 }
      );
    }, [results]);

    const calcXOffset = (width, scale) => {
      return Math.floor(((width * scale) / 2) * (1 - scale)) - 1;
    };

    const calcYOffset = (width, height, scale) => {
      const scaledHeight = height * scale;
      const scaledWidth = width * scale;
      const hypotenuseLength = Math.hypot(scaledWidth, scaledHeight);
      return Math.ceil(hypotenuseLength / 2) + 1;
    };

    return (
      <StyledSelectedChoices
        ref={ref}
        className='flex-row space-between align-center'
      >
        <div className='flex-column align-center player-container'>
          <StyledChoiceChip
            ref={playerChoiceRef}
            className='choice-chip'
            choice={playerChoice}
            showCircles={results === GAME_RESULTS.WIN}
          />
          <h3 className='fade-in'>You picked</h3>
        </div>
        {results ? (
          <div
            ref={resultsRef}
            className='hidden-sm flex-column align-center results-container relative-z-index-1'
          >
            <GameResultsText results={results} />
            <Button onClick={onPlayAgain} primary>
              Play Again
            </Button>
          </div>
        ) : null}
        <div className='flex-column align-center fade-in house-container'>
          {houseChoice ? (
            <StyledChoiceChip
              className='choice-chip'
              ref={houseChoiceRef}
              choice={houseChoice}
              scaleUp={true}
              showCircles={results === GAME_RESULTS.LOSE}
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
