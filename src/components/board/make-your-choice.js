import React, { useRef } from 'react';
import styled from 'styled-components';

import Triangle from '../../../public/images/bg-triangle.svg';
import ChoiceChip from '../choice-chip';
import { CHOICE_DATA } from '../../constants';

const StyledMakeYourChoice = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  .bg-triangle {
    background-image: url(${Triangle});
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: -1;
  }

  .top-row {
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 1024px) {
    .bg-triangle {
      background-position: center bottom;
      width: 480px;
      height: 430px;
      left: 50%;
      transform: translateX(-50%);
    }

    .top-row {
      margin-bottom: 2rem;
    }
  }
`;

const StyledChoiceChip = styled(ChoiceChip)`
  @media screen and (min-width: 1024px) {
    transform: scale(var(--desktop-choice-scale)) translateY(-25%);

    &:only-of-type {
      transform: scale(var(--desktop-choice-scale)) translateY(-75%);
    }
  }
`;

const MakeYourChoice = ({ onSelect }) => {
  const makeYourChoiceRef = useRef(null);

  const handleSelect = (targetElement) => {
    const choice = Object.keys(CHOICE_DATA).find(
      (key) => CHOICE_DATA[key].id === parseInt(targetElement.id, 10)
    );
    makeYourChoiceRef.current.querySelectorAll('[title]').forEach((el) => {
      el.id !== targetElement.id ? el.classList.add('fade-out') : () => {};
    });
    const paperChoiceEl = makeYourChoiceRef.current.querySelector(
      `[title="paper"]`
    );
    const choicePos = targetElement.getBoundingClientRect();
    const paperPos = paperChoiceEl.getBoundingClientRect();
    const coords = {
      x: choicePos.x - paperPos.x,
      y: choicePos.y - paperPos.y,
    };
    onSelect(CHOICE_DATA[choice], coords);
  };

  return (
    <StyledMakeYourChoice ref={makeYourChoiceRef}>
      <div className='bg-triangle fade-out'></div>
      <div className='flex-row space-between top-row'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.PAPER}
          onSelect={handleSelect}
        />
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.SCISSORS}
          onSelect={handleSelect}
        />
      </div>
      <div className='flex-row justify-center'>
        <StyledChoiceChip
          className='choice-chip'
          choice={CHOICE_DATA.ROCK}
          onSelect={handleSelect}
        />
      </div>
    </StyledMakeYourChoice>
  );
};

export default MakeYourChoice;
