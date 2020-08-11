import { Player, GameState, PlayersMoves, Line } from '../types';
import { isSubset, range } from './index.utils';

const newLine = (a, b, c): Line => [a, b, c];

const rows = [newLine(1, 2, 3), newLine(4, 5, 6), newLine(7, 8, 9)];
const columns = [newLine(1, 4, 7), newLine(2, 5, 8), newLine(3, 6, 9)];
const diagonals = [newLine(1, 5, 9), newLine(3, 5, 7)];
const lines = [...rows, ...columns, ...diagonals];

export const hasWon = (playerMoves) =>
  lines.some((line) => isSubset(playerMoves, line));

export const getGameState = ({ X, O }: PlayersMoves) => {
  if (hasWon(X)) {
    return GameState.XWon;
  }
  if (hasWon(O)) {
    return GameState.OWon;
  }
  if (X.length > 4) {
    return GameState.Draw;
  }
  return GameState.Incomplete;
};

export const getCurrentPlayer = ({ X, O }: PlayersMoves): Player =>
  O.length < X.length ? Player.O : Player.X;

export const getOptions = ({ X, O }: PlayersMoves): string =>
  range(1, 9).reduce((acc, position) => {
    if (X.includes(position)) {
      return acc + Player.X;
    }
    if (O.includes(position)) {
      return acc + Player.O;
    }
    return acc + position;
  }, '');

export const getBoard = ({ X, O }: PlayersMoves): string =>
  range(1, 9).reduce((acc, position) => {
    if (X.includes(position)) {
      return acc + Player.X;
    }
    if (O.includes(position)) {
      return acc + Player.O;
    }
    return `${acc}.`;
  }, '');
