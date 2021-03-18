import Paper from '../public/images/icon-paper.svg';
import Scissors from '../public/images/icon-scissors.svg';
import Rock from '../public/images/icon-rock.svg';
import Lizard from '../public/images/icon-lizard.svg';
import Spock from '../public/images/icon-spock.svg';

export const CHOICE_DATA = {
  ROCK: { id: 1, title: 'rock', imageSrc: Rock },
  PAPER: { id: 2, title: 'paper', imageSrc: Paper },
  SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors },
  LIZARD: { id: 4, title: 'lizard', imageSrc: Lizard },
  SPOCK: { id: 5, title: 'spock', imageSrc: Spock },
};

export const GAME_RESULTS = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

export const LG_BREAKPOINT = 1024;
export const LG_CHOICE_SIZE = 300;
export const LG_CHOICE_SCALE = 0.669;
export const SM_CHOICE_SIZE = 130;
export const BONUS_LG_CHOICE_SCALE = 0.5;
export const BONUS_SM_CHOICE_SCALE = 0.754;
