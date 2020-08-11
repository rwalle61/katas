import chunk from 'lodash.chunk';
import { Player, GameState, PlayersMoves } from '../types';
import { getCurrentPlayer, getOptions, getBoard } from './game.utils';

export const renderWelcome = (currentPlayer: Player) =>
  ['Welcome to Tic-Tac-Toe!', '', `Player ${currentPlayer} starts`].join('\n');

export const formatBoard = (board: string): string[] =>
  chunk(board, 3).map((row) => row.join(' '));

export const renderQuestion = (playersMoves: PlayersMoves): string => {
  return [
    `${getCurrentPlayer(playersMoves)}, which box would you like?`,
    '(Select a number)',
    ...formatBoard(getOptions(playersMoves)),
    '',
  ].join('\n');
};

const resultToString = {
  [GameState.XWon]: 'Congratulations X, you won!',
  [GameState.OWon]: 'Congratulations O, you won!',
  [GameState.Draw]: "It's a tie!",
};

export const renderResult = (gameState: GameState): string =>
  resultToString[gameState];

export const renderBoard = (playersMoves: PlayersMoves) =>
  ['', 'Board:', ...formatBoard(getBoard(playersMoves)), ''].join('\n');
