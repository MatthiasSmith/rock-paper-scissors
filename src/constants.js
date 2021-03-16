import Paper from '../public/images/icon-paper.svg';
import Scissors from '../public/images/icon-scissors.svg';
import Rock from '../public/images/icon-rock.svg';

export const CHOICE_DATA = {
  ROCK: { id: 1, title: 'rock', imageSrc: Rock },
  PAPER: { id: 2, title: 'paper', imageSrc: Paper },
  SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors },
};

export const GAME_RESULTS = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};

export const DESKTOP_BREAKPOINT = 1024;
export const DESKTOP_CHOICE_SIZE = 300;
export const DESKTOP_CHOICE_SCALE = 0.669;
