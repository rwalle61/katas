import { newPlayersMoves } from '../types';
import * as utils from './render.utils';

describe('render.utils', () => {
  describe('formatBoard(boardAsString)', () => {
    test.each([
      ['123456789', ['1 2 3', '4 5 6', '7 8 9']],
      ['XO3456789', ['X O 3', '4 5 6', '7 8 9']],
    ])('%s', (boardAsString, expectedOptions) => {
      expect(utils.formatBoard(boardAsString)).toEqual(expectedOptions);
    });
  });
  describe('renderQuestion(playersMoves)', () => {
    test.each([
      [
        'X moves first',
        [],
        [],
        [
          'X, which box would you like?',
          '(Select a number)',
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '',
        ].join('\n'),
      ],
      [
        'O moves second',
        [1],
        [],
        [
          'O, which box would you like?',
          '(Select a number)',
          'X 2 3',
          '4 5 6',
          '7 8 9',
          '',
        ].join('\n'),
      ],
      [
        'back to X to move',
        [1],
        [2],
        [
          'X, which box would you like?',
          '(Select a number)',
          'X O 3',
          '4 5 6',
          '7 8 9',
          '',
        ].join('\n'),
      ],
    ])('%s', (_testname, movesByX, movesByO, expectedOptions) => {
      expect(utils.renderQuestion(newPlayersMoves(movesByX, movesByO))).toEqual(
        expectedOptions,
      );
    });
  });
  describe('renderBoard(playersMoves)', () => {
    test.each([
      [
        'empty board',
        [],
        [],
        ['', 'Board:', '. . .', '. . .', '. . .', ''].join('\n'),
      ],
      [
        '1 move',
        [1],
        [],
        ['', 'Board:', 'X . .', '. . .', '. . .', ''].join('\n'),
      ],
      [
        'multiple moves',
        [1],
        [2],
        ['', 'Board:', 'X O .', '. . .', '. . .', ''].join('\n'),
      ],
    ])('%s', (_testname, movesByX, movesByO, expectedOptions) => {
      expect(utils.renderBoard(newPlayersMoves(movesByX, movesByO))).toEqual(
        expectedOptions,
      );
    });
  });
});
