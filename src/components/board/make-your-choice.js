import React from 'react';
import styled from 'styled-components';

import Triangle from '../../../public/images/bg-triangle.svg';
import ChoiceChip from '../choice-chip';
import { gameChoiceData } from '../../data/data';

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
`;

const MakeYourChoice = React.forwardRef(({ onSelect }, ref) => {
  const handleSelect = (event) => {
    const choice = Object.keys(gameChoiceData).find(
      (key) => gameChoiceData[key].id === parseInt(event.currentTarget.id, 10)
    );
    ref.current.querySelectorAll('[title]').forEach((el) => {
      el.id !== event.currentTarget.id
        ? el.classList.add('fade-out')
        : () => {};
    });
    onSelect(gameChoiceData[choice]);
  };

  return (
    <StyledMakeYourChoice ref={ref}>
      <div className='bg-triangle fade-out'></div>
      <div className='flex-row space-between mb-1'>
        <ChoiceChip choice={gameChoiceData.PAPER} onSelect={handleSelect} />
        <ChoiceChip choice={gameChoiceData.SCISSORS} onSelect={handleSelect} />
      </div>
      <div className='flex-row justify-center'>
        <ChoiceChip choice={gameChoiceData.ROCK} onSelect={handleSelect} />
      </div>
    </StyledMakeYourChoice>
  );
});

export default MakeYourChoice;
