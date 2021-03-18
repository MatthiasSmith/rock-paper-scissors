import React, { useContext } from 'react';
import styled from 'styled-components';
import { LG_BREAKPOINT } from '../constants';

import { ReducedMotionContext } from '../providers/reduced-motion-provider';

const StyledReducedMotion = styled.div`
  margin-bottom: 2rem;

  label {
    font-size: 0.9rem;
    letter-spacing: 0.75px;
  }

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    align-self: flex-end;
  }
`;

const StyledCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  appearance: none;
  width: 18px;
  height: 18px;
  margin-right: 0.8rem;
  position: relative;

  &:focus {
    outline: 0;
  }

  &:focus-visible {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  &::before {
    content: '';
    cursor: pointer;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: background-color 0.1s ease-out;
  }

  &::after {
    content: '';
    cursor: pointer;
    box-sizing: unset;
    height: 5px;
    width: 12px;
    left: 3px;
    top: 11px;
    margin-top: -6px;
    position: absolute;
    border-bottom: solid 3px hsl(237, 49%, 15%);
    border-left: solid 3px hsl(237, 49%, 15%);
    background: none;
    transform: rotate(-45deg) scale(0);
    transition: transform 0.1s ease-out;

    @media screen and (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &:checked::before {
    border-color: rgba(255, 255, 255, 0);
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:checked::after {
    transform: rotate(-45deg) scale(0.9);
  }
`;

const ReducedMotionToggle = () => {
  const { isReducedMotion, setReducedMotion } = useContext(
    ReducedMotionContext
  );

  const handleChange = () => {
    setReducedMotion(!isReducedMotion);
  };

  return (
    <StyledReducedMotion className='flex-row align-center'>
      <StyledCheckbox
        name='reduceMotion'
        onChange={handleChange}
        checked={isReducedMotion}
      />
      <label htmlFor='reduceMotion'>Reduce Motion</label>
    </StyledReducedMotion>
  );
};

export default ReducedMotionToggle;
