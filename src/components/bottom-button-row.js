import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { BonusGameContext } from '../providers/bonus-game-provider';

const StyledBottomButtonRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%;
  ${(props) =>
    props.isBonusGame &&
    css`
      margin-top: 2rem;
    `}
`;

const BottomButtonRow = (props) => {
  const { isBonusGame } = useContext(BonusGameContext);

  return (
    <StyledBottomButtonRow
      className='flex-1 relative-z-index-1'
      isBonusGame={isBonusGame}
    >
      {props.children}
    </StyledBottomButtonRow>
  );
};

export default BottomButtonRow;
