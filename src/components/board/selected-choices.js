import React from 'react';
import styled from 'styled-components';

import ChoiceChip from '../choice-chip';

const StyledSelectedChoices = styled.div`
  margin-bottom: 4rem;

  h3 {
    font-size: 0.95rem;
    font-weight: var(--font-weight-bold);
    margin-top: 1.5rem;
    letter-spacing: 2px;
  }

  .blank-choice {
    height: 130px;
    width: 130px;
    background-color: transparent;
    border-radius: 50%;
    position: relative;

    &::after {
      content: '';
      border-radius: 50%;
      background-color: hsl(218, 46%, 16%);
      height: 100px;
      width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }
`;

const SelectedChoices = ({ playerChoice, houseChoice }) => {
  return (
    <StyledSelectedChoices className='flex-row space-between'>
      <div className='flex-column align-center'>
        <ChoiceChip choice={playerChoice} />
        <h3>You picked</h3>
      </div>
      <div className='flex-column align-center'>
        {houseChoice ? (
          <ChoiceChip choice={houseChoice} />
        ) : (
          <div className='blank-choice'></div>
        )}

        <h3>The house picked</h3>
      </div>
    </StyledSelectedChoices>
  );
};

export default SelectedChoices;
