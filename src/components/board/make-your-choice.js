import React, { Fragment } from 'react';

import ChoiceChip from '../choice-chip';
import { gameChoiceData } from '../../data/data';

const MakeYourChoice = ({ onSelect }) => {
  return (
    <Fragment>
      <div className='flex-row space-between mb-1'>
        <ChoiceChip
          choice={gameChoiceData.PAPER}
          onClick={() => onSelect(gameChoiceData.PAPER)}
        />
        <ChoiceChip
          choice={gameChoiceData.SCISSORS}
          onClick={() => onSelect(gameChoiceData.SCISSORS)}
        />
      </div>
      <div className='flex-row justify-center'>
        <ChoiceChip
          choice={gameChoiceData.ROCK}
          onClick={() => onSelect(gameChoiceData.ROCK)}
        />
      </div>
    </Fragment>
  );
};

export default MakeYourChoice;
