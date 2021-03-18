import React from 'react';
import styled, { css } from 'styled-components';

const StyledBottomButtonRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  width: 100%;
  ${(props) =>
    props.isBonusGame &&
    css`
      margin-top: 2rem;
    `}
`;

const BottomButtonRow = (props) => {
  return (
    <StyledBottomButtonRow
      className='flex-1 relative-z-index-1'
      isBonusGame={props.isBonusGame}
    >
      {props.children}
    </StyledBottomButtonRow>
  );
};

export default BottomButtonRow;
