import React from 'react';
import styled from 'styled-components';

const StyledScoreCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
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

  @media screen and (min-width: 768px) {
    border-radius: var(--desktop-border-radius);
  }
`;

const ScoreCard = ({ score }) => {
  return (
    <StyledScoreCard className='text-center'>
      <h3 className='score-text text-uppercase'>Score</h3>
      <h2 className='score-value'>{score}</h2>
    </StyledScoreCard>
  );
};

export default ScoreCard;
