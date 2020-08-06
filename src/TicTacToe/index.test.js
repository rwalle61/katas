import * as game from '.';

describe('game', () => {
  describe('hasWon(playerMoves)', () => {
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
    ])('when player has %s', (_testName, playerMoves, expected) => {
      expect(game.hasWon(playerMoves)).toEqual(expected);
    });
  });
  describe('getNextPlayer(currentPlayer)', () => {
    test.each([
      ['X', 'O'],
      ['O', 'X'],
    ])('%s => %s', (input, expected) => {
      expect(game.getNextPlayer(input)).toEqual(expected);
    });
  });
  describe('play(movesByX, movesByO)', () => {
    test.each([
      ['X Won', [1, 2, 3], [], 'X Won'],
      ['O Won', [], [1, 2, 3], 'O Won'],
      ['Game Incomplete', [], [], 'Game Incomplete'],
      ['Game Incomplete 2', [1, 2, 4], [], 'Game Incomplete'],
      ['Game Incomplete 3', [], [1, 2, 4], 'Game Incomplete'],
      ['Draw', [1, 3, 6, 7, 8], [2, 4, 5, 9], 'Draw'],
    ])('%s', (_testName, movesByX, movesByO, expectedState) => {
      expect(game.play(movesByX, movesByO)).toEqual(expectedState);
    });
  });
});
