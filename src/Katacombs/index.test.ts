import { LocationName } from './types';
import Game from '.';

const title = 'LOST IN SHOREDITCH.\n';
const startDescription = [
  'YOU ARE STANDING AT THE END OF A BRICK LANE BEFORE A SMALL BRICK BUILDING CALLED THE OLD TRUMAN BREWERY.',
  'AROUND YOU IS A FOREST OF RESTAURANTS AND BARS. A SMALL STREAM OF CRAFTED BEER FLOWS OUT OF THE BUILDING AND DOWN A GULLY.',
].join('\n');
const trumanBreweryDescription =
  'YOU ARE INSIDE THE MAIN ROOM OF THE TRUMAN BREWERY. THERE IS A STRONG SMELL OF HOPS AND A DOZEN EMPTY CASKS.';

const newMockInput: (inputs: [...any[]], mockFunc?: jest.Mock) => jest.Mock = (
  [input, ...rest],
  mockFunc = jest.fn(),
) =>
  input
    ? newMockInput(rest, mockFunc.mockReturnValueOnce(input.split(' ')))
    : mockFunc.mockReturnValueOnce(['QUIT']);
const mockOutput = jest.fn();

describe('Game', () => {
  describe('QUIT', () => {
    it.each([
      [
        'shows the game title and describes the initial location at startup, then quits',
        jest.fn().mockReturnValueOnce(['QUIT']),
        [
          title,
          'YOU ARE STANDING AT THE END OF A BRICK LANE BEFORE A SMALL BRICK BUILDING CALLED THE OLD TRUMAN BREWERY.',
          'AROUND YOU IS A FOREST OF RESTAURANTS AND BARS. A SMALL STREAM OF CRAFTED BEER FLOWS OUT OF THE BUILDING AND DOWN A GULLY.',
          'bye',
        ].join('\n'),
      ],
    ])('%s', (_testName, mockInput, expectedOutput) => {
      const game = new Game(mockInput, mockOutput);

      game.play();

      expect(mockOutput.mock.calls.join('\n')).toEqual(expectedOutput);
    });
  });
  describe('HELP', () => {
    it.each([
      [
        'displays help',
        newMockInput(['HELP']),
        'GO [direction], LOOK [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]',
      ],
    ])('%s', (_testName, mockInput, expectedOutput) => {
      const game = new Game(mockInput, mockOutput);

      game.play();

      expect(mockOutput.mock.calls.join('\n')).toEqual(
        [
          title,
          startDescription,
          expectedOutput,
          'bye',
        ].join('\n'),
      );
    });
  });
  describe('LOOK', () => {
    it.each([
      [
        'North',
        newMockInput(['LOOK N']),
        'I CAN SEE A BRICK BUILDING WITH A SIGN SAYING "TRUMAN BREWERY" AND A WOODEN WHITE DOOR.',
      ],
      [
        'East',
        newMockInput(['LOOK E']),
        'I CAN SEE A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
      ],
      [
        'South',
        newMockInput(['LOOK S']),
        'I CAN SEE PEOPLE IN ROBES STREAMING INTO A LARGE MOSQUE WITH A TALL MINARET.',
      ],
      [
        'West',
        newMockInput(['LOOK W']),
        "I CAN SEE A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'.",
      ],
    ])('%s', (_testName, mockInput, expectedOutput) => {
      const game = new Game(mockInput, mockOutput);

      game.play();

      expect(mockOutput.mock.calls.join('\n')).toEqual(
        [
          title,
          startDescription,
          expectedOutput,
          'bye',
        ].join('\n'),
      );
    });
  });
  describe('GO', () => {
    describe('horizontally', () => {
      it.each([
        [
          'North',
          newMockInput(['GO N']),
          'YOU ARE INSIDE THE MAIN ROOM OF THE TRUMAN BREWERY. THERE IS A STRONG SMELL OF HOPS AND A DOZEN EMPTY CASKS.',
        ],
        [
          'East',
          newMockInput(['GO E']),
          'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
        ],
        [
          'South',
          newMockInput(['GO S']),
          'YOU ARE BY A LARGE MOSQUE, WITH PEOPLE IN ROBES WEAVING AROUND YOU.',
        ],
        [
          'West',
          newMockInput(['GO W']),
          "YOU ARE STANDING BY A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'. INDEED, YOU HEAR FAINT PULSES FROM INSIDE IT.",
        ],
      ])('%s', (_testName, mockInput, expectedOutput) => {
        const game = new Game(mockInput, mockOutput);

        game.play();

        expect(mockOutput.mock.calls.join('\n')).toEqual(
          [
            title,
            startDescription,
            expectedOutput,
            'bye',
          ].join('\n'),
        );
      });
    });

    describe('vertically', () => {
      it.each([
        [
          'Up',
          newMockInput(['GO UP']),
          'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
        ],
        [
          'Down',
          newMockInput(['GO DOWN']),
          'YOU ARE DOWNSTAIRS IN THE TRUMAN BREWERY.',
        ],
      ])('%s', (_testName, mockInput, expectedOutput) => {
        const game = new Game(
          mockInput,
          mockOutput,
          LocationName.TrumanBrewery,
        );

        game.play();

        expect(mockOutput.mock.calls.join('\n')).toEqual(
          [
            title,
            trumanBreweryDescription,
            expectedOutput,
            'bye',
          ].join('\n'),
        );
      });
    });

    describe('mutually reversed references', () => {
      it.each([
        [
          'North',
          newMockInput(['GO N', 'GO S']),
          'YOU ARE INSIDE THE MAIN ROOM OF THE TRUMAN BREWERY. THERE IS A STRONG SMELL OF HOPS AND A DOZEN EMPTY CASKS.',
        ],
        [
          'East',
          newMockInput(['GO E', 'GO W']),
          'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
        ],
      ])('%s and back', (_testName, mockInput, expectedOutput) => {
        const game = new Game(mockInput, mockOutput);

        game.play();

        expect(mockOutput.mock.calls.join('\n')).toEqual(
          [
            title,
            startDescription,
            expectedOutput,
            startDescription,
            'bye',
          ].join('\n'),
        );
      });
      it.each([
        [
          'Up',
          newMockInput(['GO UP', 'GO DOWN']),
          'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
        ],
      ])('%s and back', (_testName, mockInput, expectedOutput) => {
        const game = new Game(
          mockInput,
          mockOutput,
          LocationName.TrumanBrewery,
        );

        game.play();

        expect(mockOutput.mock.calls.join('\n')).toEqual(
          [
            title,
            trumanBreweryDescription,
            expectedOutput,
            trumanBreweryDescription,
            'bye',
          ].join('\n'),
        );
      });
    });
  });
});
