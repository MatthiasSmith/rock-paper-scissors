import Paper from '../../public/images/icon-paper.svg';
import Scissors from '../../public/images/icon-scissors.svg';
import Rock from '../../public/images/icon-rock.svg';

export const gameChoiceData = {
  ROCK: { id: 1, title: 'rock', imageSrc: Rock },
  PAPER: { id: 2, title: 'paper', imageSrc: Paper },
  SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors },
};

export const gameResults = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
};
