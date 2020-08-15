import Game from '.';
import Bag from './Bag';
import Item from './Item';
import Start from './locations/Start';
import TrumanBrewery from './locations/TrumanBrewery';
import TrumanBreweryBasement from './locations/TrumanBreweryBasement';
import TrumanBreweryLair from './locations/TrumanBreweryLair';
import TrumanBrewerySubLair from './locations/TrumanBrewerySubLair';

const title = 'LOST IN SHOREDITCH.\n';
const quitText = 'bye';
const emptyBagText = 'THE BAG IS EMPTY. IT LOOKS BIG ENOUGH FOR 10 ITEMS';

const newMockInput: (inputs: [...any[]], mockFunc?: jest.Mock) => jest.Mock = (
  [input, ...rest],
  mockFunc = jest.fn(),
) =>
  input
    ? newMockInput(rest, mockFunc.mockReturnValueOnce(input.split(' ')))
    : mockFunc.mockReturnValueOnce(['QUIT']);
const output = jest.fn();

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
          quitText,
        ].join('\n'),
      ],
    ])('%s', (_testName, input, expectedOutput) => {
      const game = new Game({ input, output });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(expectedOutput);
    });
  });
  describe('HELP', () => {
    it.each([
      [
        'displays help',
        newMockInput(['HELP']),
        'GO [direction], LOOK [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]',
      ],
    ])('%s', (_testName, input, expectedOutput) => {
      const game = new Game({ input, output });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
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
    ])('%s', (_testName, input, expectedOutput) => {
      const game = new Game({ input, output });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
  describe('GO', () => {
    describe('horizontally', () => {
      it.each([
        ['North', newMockInput(['GO N']), new TrumanBrewery().description],
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
      ])('%s', (_testName, input, expectedOutput) => {
        const game = new Game({ input, output });

        game.play();

        expect(output.mock.calls.join('\n')).toEqual(
          [title, new Start().description, expectedOutput, quitText].join('\n'),
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
      ])('%s', (_testName, input, expectedOutput) => {
        const game = new Game({
          input,
          output,
          startingLocation: new TrumanBrewery(),
        });

        game.play();

        expect(output.mock.calls.join('\n')).toEqual(
          [
            title,
            new TrumanBrewery().description,
            expectedOutput,
            quitText,
          ].join('\n'),
        );
      });
    });

    describe('mutually reversed references', () => {
      it.each([
        [
          'North',
          newMockInput(['GO N', 'GO S']),
          new Start(),
          new TrumanBrewery().description,
        ],
        [
          'East',
          newMockInput(['GO E', 'GO W']),
          new Start(),
          'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
        ],
        [
          'Up',
          newMockInput(['GO UP', 'GO DOWN']),
          new TrumanBrewery(),
          'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
        ],
      ])(
        '%s and back',
        (_testName, input, startingLocation, expectedOutput) => {
          const game = new Game({ input, output, startingLocation });

          game.play();

          expect(output.mock.calls.join('\n')).toEqual(
            [
              title,
              startingLocation.description,
              expectedOutput,
              startingLocation.description,
              quitText,
            ].join('\n'),
          );
        },
      );
    });

    describe('collecting gold', () => {
      it.each([
        [
          'location without gold',
          newMockInput(['GO N', 'BAG']),
          new Start(),
          [new TrumanBrewery().description, 'THE BAG CONTAINS: KEYS'].join(
            '\n',
          ),
        ],
        [
          'location with gold',
          newMockInput(['GO DOWN', 'BAG']),
          new TrumanBreweryBasement(),
          [
            new TrumanBreweryLair().description,
            'YOU FIND 5 GOLD!',
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
        [
          'location with different amount of gold',
          newMockInput(['GO DOWN', 'BAG']),
          new TrumanBreweryLair(),
          [
            new TrumanBrewerySubLair().description,
            'YOU FIND 6 GOLD!',
            'THE BAG CONTAINS: KEYS, 6 GOLD',
          ].join('\n'),
        ],
        [
          'returning to a location that no longer has gold',
          newMockInput(['GO DOWN', 'GO UP', 'GO DOWN', 'BAG']),
          new TrumanBreweryBasement(),
          [
            new TrumanBreweryLair().description,
            'YOU FIND 5 GOLD!',
            new TrumanBreweryBasement().description,
            new TrumanBreweryLair().description,
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
      ])('%s', (_testName, input, startingLocation, expectedOutput) => {
        const game = new Game({
          input,
          output,
          startingLocation,
          startingBag: new Bag(new Item('KEYS')),
        });

        game.play();

        expect(output.mock.calls.join('\n')).toEqual(
          [title, startingLocation.description, expectedOutput, quitText].join(
            '\n',
          ),
        );
      });
    });
  });
  describe('OPEN', () => {
    it.each([
      [
        '= GO when the object is a door',
        newMockInput(['OPEN DOOR']),
        new Start(),
        new TrumanBrewery().description,
      ],
      [
        '= GO when the object is a door in a different direction',
        newMockInput(['OPEN DOOR']),
        new TrumanBrewery(),
        new Start().description,
      ],
    ])('%s', (_testName, input, startingLocation, expectedOutput) => {
      const game = new Game({ input, output, startingLocation });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, startingLocation.description, expectedOutput, quitText].join(
          '\n',
        ),
      );
    });
  });
  describe('BAG', () => {
    it.each([['starts with empty bag', newMockInput(['BAG']), emptyBagText]])(
      '%s',
      (_testName, input, expectedOutput) => {
        const game = new Game({ input, output });

        game.play();

        expect(output.mock.calls.join('\n')).toEqual(
          [title, new Start().description, expectedOutput, quitText].join('\n'),
        );
      },
    );
    it.each([
      [
        'item in bag',
        newMockInput(['BAG']),
        new Bag(new Item('SOME KEYS')),
        'THE BAG CONTAINS: SOME KEYS',
      ],
      [
        'different item in bag',
        newMockInput(['BAG']),
        new Bag(new Item('A COMPASS')),
        'THE BAG CONTAINS: A COMPASS',
      ],
      [
        'multiple items in bag',
        newMockInput(['BAG']),
        new Bag(new Item('SOME KEYS'), new Item('A COMPASS')),
        'THE BAG CONTAINS: SOME KEYS, A COMPASS',
      ],
    ])('%s', (_testName, input, startingBag, expectedOutput) => {
      const game = new Game({ input, output, startingBag });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
  describe('TAKE', () => {
    it.each([
      [
        'item',
        newMockInput(['TAKE KEYS', 'BAG']),
        ['KEYS: TAKEN', 'THE BAG CONTAINS: KEYS'].join('\n'),
      ],
      [
        'different item',
        newMockInput(['TAKE COMPASS', 'BAG']),
        ['COMPASS: TAKEN', 'THE BAG CONTAINS: COMPASS'].join('\n'),
      ],
      [
        'multiple items',
        newMockInput(['TAKE KEYS', 'TAKE COMPASS', 'BAG']),
        [
          'KEYS: TAKEN',
          'COMPASS: TAKEN',
          'THE BAG CONTAINS: KEYS, COMPASS',
        ].join('\n'),
      ],
      [
        'item not in location',
        newMockInput(['TAKE UNKNOWN_THING', 'BAG']),
        ['NO UNKNOWN_THING HERE!', emptyBagText].join('\n'),
      ],
      [
        'different item not in location',
        newMockInput(['TAKE UNKNOWN_THING_2', 'BAG']),
        ['NO UNKNOWN_THING_2 HERE!', emptyBagText].join('\n'),
      ],
      [
        'more items than there are in location',
        newMockInput(['TAKE KEYS', 'TAKE KEYS', 'BAG']),
        ['KEYS: TAKEN', 'NO KEYS HERE!', 'THE BAG CONTAINS: KEYS'].join('\n'),
      ],
    ])('%s', (_testName, input, expectedOutput) => {
      const game = new Game({
        input,
        output,
        startingLocation: new TrumanBrewery(),
      });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new TrumanBrewery().description, expectedOutput, quitText].join(
          '\n',
        ),
      );
    });
  });
  describe('DROP', () => {
    it.each([
      [
        'item',
        newMockInput(['DROP KEYS', 'BAG']),
        new Bag(new Item('KEYS')),
        ['KEYS: DROPPED', emptyBagText].join('\n'),
      ],
      [
        'different item',
        newMockInput(['DROP COMPASS', 'BAG']),
        new Bag(new Item('COMPASS')),
        ['COMPASS: DROPPED', emptyBagText].join('\n'),
      ],
      [
        'item remaining in bag',
        newMockInput(['DROP COMPASS', 'BAG']),
        new Bag(new Item('KEYS'), new Item('COMPASS')),
        ['COMPASS: DROPPED', 'THE BAG CONTAINS: KEYS'].join('\n'),
      ],
      [
        'item not in bag',
        newMockInput(['DROP KEYS']),
        new Bag(),
        'NO KEYS IN BAG',
      ],
    ])('%s', (_testName, input, startingBag, expectedOutput) => {
      const game = new Game({
        input,
        output,
        startingBag,
      });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
  describe('USE', () => {
    it.each([
      [
        'item that can be used here',
        newMockInput(['USE KEYS']),
        new Bag(new Item('KEYS')),
        new TrumanBreweryBasement(),
        'THE TRAP DOOR HAS BEEN UNLOCKED!',
      ],
      [
        'different item that can be used here',
        newMockInput(['USE COMPASS']),
        new Bag(new Item('COMPASS')),
        new Start(),
        'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
      ],
      [
        "item that can't be used here",
        newMockInput(['USE KEYS']),
        new Bag(new Item('KEYS')),
        new Start(),
        'KEYS CANNOT BE USED HERE.',
      ],
      [
        "item that isn't in bag",
        newMockInput(['USE KEYS']),
        new Bag(),
        new Start(),
        'NO KEYS IN BAG',
      ],
    ])(
      '%s',
      (_testName, input, startingBag, startingLocation, expectedOutput) => {
        const game = new Game({
          input,
          output,
          startingBag,
          startingLocation,
        });

        game.play();

        expect(output.mock.calls.join('\n')).toEqual(
          [title, startingLocation.description, expectedOutput, quitText].join(
            '\n',
          ),
        );
      },
    );
  });
  describe('INTEGRATION: TAKE, MOVE, DROP', () => {
    it.each([
      [
        'cannot take, drop, take, cannot take',
        newMockInput(['TAKE KEYS', 'DROP KEYS', 'TAKE KEYS', 'TAKE KEYS']),
        new Bag(new Item('KEYS')),
        ['NO KEYS HERE!', 'KEYS: DROPPED', 'KEYS: TAKEN', 'NO KEYS HERE!'].join(
          '\n',
        ),
      ],
    ])('%s', (_testName, input, startingBag, expectedOutput) => {
      const game = new Game({
        input,
        output,
        startingBag,
      });

      game.play();

      expect(output.mock.calls.join('\n')).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
});
