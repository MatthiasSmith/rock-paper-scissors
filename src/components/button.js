import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  appearance: none;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-semi-bold);
  letter-spacing: 2px;
  padding: 0.6rem 2.25rem;
  text-transform: uppercase;

  ${(props) =>
    props.primary &&
    css`
      background-color: white;
      border: none;
      color: var(--dark-text);
      padding: 0.9rem 3.6rem;
    `}
`;

const button = (props) => {
  return (
    <StyledButton type='button' {...props}>
      {props.children}
    </StyledButton>
  );
};

export default button;
