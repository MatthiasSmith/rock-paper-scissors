import React, { useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import ChoiceChip from '../choice-chip';
import GameResultsText from './game-results-text';
import Button from '../button';
import {
  GAME_RESULTS,
  LG_BREAKPOINT,
  LG_CHOICE_SIZE,
  LG_CHOICE_SCALE,
  BONUS_LG_CHOICE_SCALE,
  BONUS_SM_CHOICE_SCALE,
  SM_CHOICE_SIZE,
} from '../../constants';
import { ReducedMotionContext } from '../../providers/reduced-motion-provider';
import { BonusGameContext } from '../../providers/bonus-game-provider';

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

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
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
  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    order: 2;
  }
`;

const SelectedChoices = ({
  playerChoice,
  houseChoice,
  startingCoords,
  onAnimateComplete,
  results,
  onPlayAgain,
}) => {
  const { isReducedMotion } = useContext(ReducedMotionContext);
  const { isBonusGame } = useContext(BonusGameContext);
  const houseChoiceRef = useRef(null);
  const resultsRef = useRef(null);
  const playerChoiceRef = useRef(null);
  const isSmScreen = document.documentElement.clientWidth < LG_BREAKPOINT;

  const calcOffset = (squareDimension, scale) => {
    return squareDimension * ((1 - scale) / 2);
  };

  useLayoutEffect(() => {
    if (!houseChoice) {
      gsap.fromTo(
        '.fade-in',
        { opacity: 0 },
        {
          opacity: 1,
          delay: 0.75,
          duration: !isReducedMotion ? 0.5 : 0,
        }
      );

      const endPos = playerChoiceRef.current.getBoundingClientRect();
      let scale = isSmScreen ? 1 : LG_CHOICE_SCALE;
      if (isBonusGame) {
        scale = isSmScreen ? BONUS_SM_CHOICE_SCALE : BONUS_LG_CHOICE_SCALE;
      }
      const offset = calcOffset(
        isSmScreen ? SM_CHOICE_SIZE : LG_CHOICE_SIZE,
        scale
      );

      gsap.fromTo(
        playerChoiceRef.current,
        {
          x: startingCoords.x - endPos.x - offset,
          y: startingCoords.y - endPos.y - offset,
          scale: scale,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          ease: 'power1.in',
          duration: !isReducedMotion ? 0.4 : 0,
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
      if (isReducedMotion) {
        tl.duration(0);
      }
    }
  }, [houseChoice]);

  useLayoutEffect(() => {
    if (!results) return;
    gsap.set(['.player-container', '.house-container'], { x: 0 });
    gsap.fromTo(
      resultsRef.current,
      { opacity: 0 },
      { opacity: 1, ease: 'power1.out', duration: !isReducedMotion ? 0.4 : 0 }
    );
  }, [results]);

  return (
    <StyledSelectedChoices className='flex-row space-between align-center'>
      <div className='flex-column align-center player-container'>
        <StyledChoiceChip
          ref={playerChoiceRef}
          className='choice-chip'
          choice={playerChoice}
          showCircles={results === GAME_RESULTS.WIN}
        />
        <h3 className='fade-in' role='alert' aria-live='assertive'>
          You picked <span className='sr-only'>{playerChoice.title}</span>
        </h3>
      </div>
      {results ? (
        <div
          ref={resultsRef}
          className='hidden-sm flex-column align-center results-container relative-z-index-1'
          role='alert'
          aria-live='polite'
          aria-atomic='true'
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
            showCircles={results === GAME_RESULTS.LOSE}
          />
        ) : (
          <div className='blank-choice'></div>
        )}
        <h3 role='alert' aria-live='polite'>
          The house picked{' '}
          {houseChoice ? (
            <span className='sr-only'>{houseChoice.title}</span>
          ) : null}
        </h3>
      </div>
    </StyledSelectedChoices>
  );
};

export default SelectedChoices;
