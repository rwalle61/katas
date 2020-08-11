import Game from '.';

const mockInput = jest.fn();
const mockOutput = jest.fn();
const mockQuestion = 'question';
const mockInputImplementation = (returnValue) => () => {
  mockOutput(mockQuestion);
  return returnValue;
};

describe('Game', () => {
  describe('play()', () => {
    test.each([
      [
        'X wins',
        mockInput
          .mockImplementationOnce(mockInputImplementation(1))
          .mockImplementationOnce(mockInputImplementation(2))
          .mockImplementationOnce(mockInputImplementation(4))
          .mockImplementationOnce(mockInputImplementation(5))
          .mockImplementationOnce(mockInputImplementation(7)),
        mockOutput,
        [
          'Welcome to Tic-Tac-Toe!',
          '',
          'Player X starts',
          '',
          'Board:',
          '. . .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X . .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O .',
          'X . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O .',
          'X O .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O .',
          'X O .',
          'X . .',
          '',
          'Congratulations X, you won!',
        ].join('\n'),
      ],
      [
        'O wins',
        mockInput
          .mockImplementationOnce(mockInputImplementation(2))
          .mockImplementationOnce(mockInputImplementation(1))
          .mockImplementationOnce(mockInputImplementation(5))
          .mockImplementationOnce(mockInputImplementation(4))
          .mockImplementationOnce(mockInputImplementation(3))
          .mockImplementationOnce(mockInputImplementation(7)),
        mockOutput,
        [
          'Welcome to Tic-Tac-Toe!',
          '',
          'Player X starts',
          '',
          'Board:',
          '. . .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          '. X .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'O X .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'O X .',
          '. X .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'O X .',
          'O X .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'O X X',
          'O X .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'O X X',
          'O X .',
          'O . .',
          '',
          'Congratulations O, you won!',
        ].join('\n'),
      ],
      [
        'Draw',
        mockInput
          .mockImplementationOnce(mockInputImplementation(1))
          .mockImplementationOnce(mockInputImplementation(2))
          .mockImplementationOnce(mockInputImplementation(3))
          .mockImplementationOnce(mockInputImplementation(4))
          .mockImplementationOnce(mockInputImplementation(6))
          .mockImplementationOnce(mockInputImplementation(5))
          .mockImplementationOnce(mockInputImplementation(7))
          .mockImplementationOnce(mockInputImplementation(9))
          .mockImplementationOnce(mockInputImplementation(8)),
        mockOutput,
        [
          'Welcome to Tic-Tac-Toe!',
          '',
          'Player X starts',
          '',
          'Board:',
          '. . .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X . .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O .',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          '. . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O . .',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O . X',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O O X',
          '. . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O O X',
          'X . .',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O O X',
          'X . O',
          '',
          mockQuestion,
          '',
          'Board:',
          'X O X',
          'O O X',
          'X X O',
          '',
          "It's a tie!",
        ].join('\n'),
      ],
    ])('%s', (_testName, input, output, expectedOutput) => {
      const game = new Game(input, output);
      game.play();
      expect(output.mock.calls.join('\n')).toEqual(expectedOutput);
    });
  });
});
