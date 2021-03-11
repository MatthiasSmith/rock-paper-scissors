import React from 'react';
import styled from 'styled-components';

const StyledAttribution = styled.div`
  font-size: 11px;
  margin-bottom: 0.5rem;
  text-align: center;

  a {
    color: hsl(228, 45%, 44%);
  }
`;

const Attribution = () => {
  return (
    <StyledAttribution>
      <span>Challenge by </span>
      <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
        Frontend Mentor
      </a>
      <span>. Coded by</span>{' '}
      <a href='https://github.com/MatthiasSmith/rock-paper-scissors'>
        Matthias
      </a>
      .
    </StyledAttribution>
  );
};

export default Attribution;
