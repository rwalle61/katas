import { newPlayersMoves, Moves, GameState } from '../types';
import * as utils from './game.utils';

describe('game.utils', () => {
  describe('hasWon(moves)', () => {
    test.each([
      ['no pieces on board', [], false],
      ['3 pieces on the board but not in any rows', [1, 2, 4], false],
      // rows
      ['3 pieces in the top row', [1, 2, 3], true],
      ['3 pieces in the middle row', [4, 5, 6], true],
      ['3 pieces in the bottom row', [7, 8, 9], true],
      ['3 pieces in the top row in different order', [2, 1, 3], true],
      // columns
      ['3 pieces in the left column', [1, 4, 7], true],
      ['3 pieces in the middle column', [2, 5, 8], true],
      ['3 pieces in the right column', [3, 6, 9], true],
      ['3 pieces in the left column in different order', [4, 1, 7], true],
      // diagonals
      ['3 pieces in the downwards diagonal', [1, 5, 9], true],
      ['3 pieces in the upwards diagnoal', [3, 5, 7], true],
    ])('when player has %s', (_testName, moves: Moves, expected) => {
      expect(utils.hasWon(moves)).toEqual(expected);
    });
  });
  describe('getGameState(playersMoves)', () => {
    test.each([
      ['X Won', [1, 2, 3], [], GameState.XWon],
      ['O Won', [], [1, 2, 3], GameState.OWon],
      ['Game Incomplete', [], [], GameState.Incomplete],
      ['Game Incomplete 2', [1, 2, 4], [], GameState.Incomplete],
      ['Game Incomplete 3', [], [1, 2, 4], GameState.Incomplete],
      ['Draw', [1, 3, 6, 7, 8], [2, 4, 5, 9], GameState.Draw],
    ])('%s', (_testName, movesByX, movesByO, expectedState) => {
      expect(utils.getGameState(newPlayersMoves(movesByX, movesByO))).toEqual(
        expectedState,
      );
    });
  });
  describe('getOptions(playersMoves)', () => {
    test.each([
      [[], [], '123456789'],
      [[1], [], 'X23456789'],
      [[2], [], '1X3456789'],
      [[], [1], 'O23456789'],
      [[], [2], '1O3456789'],
      [[1], [2], 'XO3456789'],
    ])('%s', (movesByX, movesByO, expectedOptions) => {
      expect(utils.getOptions(newPlayersMoves(movesByX, movesByO))).toEqual(
        expectedOptions,
      );
    });
  });
});
