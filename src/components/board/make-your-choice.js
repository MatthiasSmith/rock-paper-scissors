import React, { Fragment, useContext, useLayoutEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from 'gsap';

import Triangle from '../../../public/images/bg-triangle.svg';
import Pentagon from '../../../public/images/bg-pentagon.svg';
import ChoiceChip from '../choice-chip';
import { CHOICE_DATA, LG_BREAKPOINT } from '../../constants';
import { ReducedMotionContext } from '../../providers/reduced-motion-provider';
import { BonusGameContext } from '../../providers/bonus-game-provider';

const StyledMakeYourChoice = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  ${(props) =>
    props.isBonusGame &&
    css`
      display: grid;
      grid-template-rows: 98px 85px 98px;
      align-items: center;
    `}

  .bg-triangle,
  .bg-pentagon {
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: -1;
  }

  .bg-triangle {
    background-image: url(${Triangle});
    background-size: 80%;
  }

  .bg-pentagon {
    background-image: url(${Pentagon});
    background-position: center 50px;
    background-size: 70%;
  }

  .top-row {
    margin-bottom: 1rem;
  }

  .bottom-row {
    margin: 3.5rem auto 0;
  }

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    ${(props) =>
      props.isBonusGame &&
      css`
        display: grid;
        grid-template-rows: 150px 100px 150px;
        align-items: center;
      `}

    .bg-triangle {
      background-position: center bottom;
      width: 480px;
      height: 430px;
      left: 50%;
      transform: translateX(-50%);
    }

    .bg-pentagon {
      background-size: 55%;
    }

    .top-row {
      margin-bottom: 2rem;
    }

    .middle-row {
      width: 640px;
    }

    .bottom-row {
      display: grid;
      grid-template-columns: 150px 3.5rem 150px;
      justify-items: center;
      margin-top: 7.5rem;

      > div:last-of-type {
        grid-column: 3;
      }
    }
  }
`;

const StyledChoiceChip = styled(ChoiceChip)`
  ${(props) =>
    props.isBonusGame &&
    css`
      transform: scale(var(--bonus-sm-choice-scale));
    `}

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    ${(props) =>
      props.isBonusGame
        ? css`
            transform: scale(var(--bonus-lg-choice-scale));
          `
        : css`
            transform: scale(var(--lg-choice-scale)) translateY(-25%);

            &:only-of-type {
              transform: scale(var(--lg-choice-scale)) translateY(-75%);
            }
          `}
  }
`;

const GameArea = ({ onSelect }) => {
  return (
    <Fragment>
      <div className='flex-row space-between top-row'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.PAPER}
          onSelect={onSelect}
        />
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.SCISSORS}
          onSelect={onSelect}
        />
      </div>
      <div className='flex-row justify-center'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.ROCK}
          onSelect={onSelect}
        />
      </div>
    </Fragment>
  );
};

const BonusGameArea = ({ onSelect }) => {
  return (
    <Fragment>
      <div className='flex-row justify-center'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.SCISSORS}
          onSelect={onSelect}
          isBonusGame={true}
        />
      </div>
      <div className='flex-row space-between middle-row'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.SPOCK}
          onSelect={onSelect}
          isBonusGame={true}
        />
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.PAPER}
          onSelect={onSelect}
          isBonusGame={true}
        />
      </div>
      <div className='flex-row space-between bottom-row'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.LIZARD}
          onSelect={onSelect}
          isBonusGame={true}
        />
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.ROCK}
          onSelect={onSelect}
          isBonusGame={true}
        />
      </div>
    </Fragment>
  );
};

const MakeYourChoice = ({ onSelect }) => {
  const { isReducedMotion } = useContext(ReducedMotionContext);
  const { isBonusGame } = useContext(BonusGameContext);
  const makeYourChoiceRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      makeYourChoiceRef.current,
      { scale: 0 },
      { scale: 1, duration: !isReducedMotion ? 0.4 : 0, ease: 'back.out' }
    );
  }, [isBonusGame]);

  const handleSelect = (targetElement) => {
    const choice = Object.keys(CHOICE_DATA).find(
      (key) => CHOICE_DATA[key].id === parseInt(targetElement.id, 10)
    );
    makeYourChoiceRef.current.querySelectorAll('[title]').forEach((el) => {
      el.id !== targetElement.id ? el.classList.add('fade-out') : () => {};
    });
    const choicePos = targetElement.getBoundingClientRect();
    const coords = {
      x: choicePos.x,
      y: choicePos.y,
    };
    onSelect(CHOICE_DATA[choice], coords);
  };

  return (
    <StyledMakeYourChoice
      ref={makeYourChoiceRef}
      isBonusGame={isBonusGame}
      aria-label={`Make your choice. ${
        isBonusGame
          ? 'Rock, Paper, Scissors, Lizard, or Spock'
          : 'Rock, Paper, or Scissors'
      }.`}
      aria-live='polite'
    >
      <div
        aria-hidden='true'
        className={`${isBonusGame ? 'bg-pentagon' : 'bg-triangle'} fade-out`}
      ></div>
      {isBonusGame ? (
        <BonusGameArea onSelect={handleSelect} />
      ) : (
        <GameArea onSelect={handleSelect} />
      )}
    </StyledMakeYourChoice>
  );
};

export default MakeYourChoice;
