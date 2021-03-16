import React from 'react';
import styled from 'styled-components';

import { DESKTOP_BREAKPOINT } from '../../constants';

const StyledScoreCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  text-align: center;
  padding: 0.6rem;
  width: 80px;

  .score-text {
    color: var(--score-text);
    font-size: 0.7rem;
    font-weight: var(--font-weight-semi-bold);
    letter-spacing: 1px;
  }

  .score-value {
    color: var(--dark-text);
    font-size: 2.5rem;
    line-height: 1em;
  }

  @media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    border-radius: var(--desktop-border-radius);
    padding: 1.1rem;
    width: 150px;

    .score-text {
      font-size: 1rem;
    }

    .score-value {
      font-size: 4rem;
    }
  }
`;

const ScoreCard = ({ score }) => {
  return (
    <StyledScoreCard role='status' aria-live='polite' aria-atomic='true'>
      <h2 className='score-text'>Score</h2>
      <h3 className='score-value'>{score}</h3>
    </StyledScoreCard>
  );
};

export default ScoreCard;
