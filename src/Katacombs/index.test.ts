import Game from '.';
import Bag from './Bag';
import Item from './Item';
import Start from './locations/Start';
import TrumanBrewery from './locations/TrumanBrewery';
import TrumanBreweryBasement from './locations/TrumanBreweryBasement';
import TrumanBreweryLair from './locations/TrumanBreweryLair';
import TrumanBrewerySubLair from './locations/TrumanBrewerySubLair';
import Map from './Map';

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
const actualOutput = () => output.mock.calls.join('\n');

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

      expect(actualOutput()).toEqual(expectedOutput);
    });
  });
  describe('HELP', () => {
    it.each([
      [
        'displays help',
        newMockInput(['HELP']),
        'GO [direction], LOOK [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]',
      ],
      [
        'displays help when entering unknown command',
        newMockInput(['UNKNOWN_COMMAND']),
        'GO [direction], LOOK [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]',
      ],
    ])('%s', (_testName, input, expectedOutput) => {
      const game = new Game({ input, output });

      game.play();

      expect(actualOutput()).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
  describe('LOOK', () => {
    it.each([
      [
        'North',
        newMockInput(['LOOK N']),
        Start,
        'I CAN SEE A BRICK BUILDING WITH A SIGN SAYING "TRUMAN BREWERY" AND A WOODEN WHITE DOOR.',
      ],
      [
        'East',
        newMockInput(['LOOK E']),
        Start,
        'I CAN SEE A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
      ],
      [
        'South',
        newMockInput(['LOOK S']),
        Start,
        'I CAN SEE PEOPLE IN ROBES STREAMING INTO A LARGE MOSQUE WITH A TALL MINARET.',
      ],
      [
        'West',
        newMockInput(['LOOK W']),
        Start,
        "I CAN SEE A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'.",
      ],
      [
        'Up',
        newMockInput(['LOOK UP']),
        TrumanBrewery,
        'I CAN SEE UPSTAIRS IN THE TRUMAN BREWERY.',
      ],
      [
        'Down',
        newMockInput(['LOOK DOWN']),
        TrumanBrewery,
        'I CAN SEE DOWNSTAIRS IN THE TRUMAN BREWERY.',
      ],
      [
        'Unknown direction',
        newMockInput(['LOOK FOO']),
        Start,
        'FOO: UNKNOWN DIRECTION',
      ],
      [
        'Direction goes off the map',
        newMockInput(['LOOK UP']),
        Start,
        'NOTHING TO SEE THERE!',
      ],
    ])('%s', (_testName, input, StartingLocation, expectedOutput) => {
      const game = new Game({
        input,
        output,
        map: new Map({ StartingLocation }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [
          title,
          new StartingLocation().description,
          expectedOutput,
          quitText,
        ].join('\n'),
      );
    });
  });
  describe('GO', () => {
    it.each([
      ['North', newMockInput(['GO N']), Start, new TrumanBrewery().description],
      [
        'East',
        newMockInput(['GO E']),
        Start,
        'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
      ],
      [
        'South',
        newMockInput(['GO S']),
        Start,
        'YOU ARE BY A LARGE MOSQUE, WITH PEOPLE IN ROBES WEAVING AROUND YOU.',
      ],
      [
        'West',
        newMockInput(['GO W']),
        Start,
        "YOU ARE STANDING BY A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'. INDEED, YOU HEAR FAINT PULSES FROM INSIDE IT.",
      ],
      [
        'Up',
        newMockInput(['GO UP']),
        TrumanBrewery,
        'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
      ],
      [
        'Down',
        newMockInput(['GO DOWN']),
        TrumanBrewery,
        'YOU ARE DOWNSTAIRS IN THE TRUMAN BREWERY.',
      ],
      [
        'Unknown direction',
        newMockInput(['GO FOO']),
        Start,
        'FOO: UNKNOWN DIRECTION',
      ],
      [
        'Direction goes off the map',
        newMockInput(['GO UP']),
        Start,
        "CAN'T GET THERE!",
      ],
    ])('%s', (_testName, input, StartingLocation, expectedOutput) => {
      const game = new Game({
        input,
        output,
        map: new Map({ StartingLocation }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [
          title,
          new StartingLocation().description,
          expectedOutput,
          quitText,
        ].join('\n'),
      );
    });

    describe('mutually reversed references', () => {
      it.each([
        [
          'North',
          newMockInput(['GO N', 'GO S']),
          Start,
          new TrumanBrewery().description,
        ],
        [
          'East',
          newMockInput(['GO E', 'GO W']),
          Start,
          'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
        ],
        [
          'Up',
          newMockInput(['GO UP', 'GO DOWN']),
          TrumanBrewery,
          'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
        ],
      ])(
        '%s and back',
        (_testName, input, StartingLocation, expectedOutput) => {
          const game = new Game({
            input,
            output,
            map: new Map({ StartingLocation }),
          });

          game.play();

          expect(actualOutput()).toEqual(
            [
              title,
              new StartingLocation().description,
              expectedOutput,
              new StartingLocation().description,
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
          Start,
          [new TrumanBrewery().description, 'THE BAG CONTAINS: KEYS'].join(
            '\n',
          ),
        ],
        [
          'location with gold',
          newMockInput(['GO DOWN', 'BAG']),
          TrumanBreweryBasement,
          [
            new TrumanBreweryLair().description,
            'YOU FIND 5 GOLD!',
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
        [
          'location with different amount of gold',
          newMockInput(['GO DOWN', 'BAG']),
          TrumanBreweryLair,
          [
            new TrumanBrewerySubLair().description,
            'YOU FIND 6 GOLD!',
            'THE BAG CONTAINS: KEYS, 6 GOLD',
          ].join('\n'),
        ],
        [
          'returning to a location that no longer has gold',
          newMockInput(['GO DOWN', 'GO UP', 'GO DOWN', 'BAG']),
          TrumanBreweryBasement,
          [
            new TrumanBreweryLair().description,
            'YOU FIND 5 GOLD!',
            new TrumanBreweryBasement().description,
            new TrumanBreweryLair().description,
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
      ])('%s', (_testName, input, StartingLocation, expectedOutput) => {
        const game = new Game({
          input,
          output,
          map: new Map({ StartingLocation }),
          bag: new Bag(new Item('KEYS')),
        });

        game.play();

        expect(actualOutput()).toEqual(
          [
            title,
            new StartingLocation().description,
            expectedOutput,
            quitText,
          ].join('\n'),
        );
      });
    });
  });
  describe('OPEN', () => {
    it.each([
      [
        '= GO when the object is a door',
        newMockInput(['OPEN DOOR']),
        Start,
        new TrumanBrewery().description,
      ],
      [
        '= GO when the object is a door in a different direction',
        newMockInput(['OPEN DOOR']),
        TrumanBrewery,
        new Start().description,
      ],
      [
        'does nothing when the object is not in the environment',
        newMockInput(['OPEN FOO']),
        Start,
        'NO FOO TO OPEN!',
      ],
      [
        'does nothing when no openable objects are in the environment',
        newMockInput(['OPEN FOO']),
        TrumanBreweryBasement,
        'NO FOO TO OPEN!',
      ],
    ])('%s', (_testName, input, StartingLocation, expectedOutput) => {
      const game = new Game({
        input,
        output,
        map: new Map({ StartingLocation }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [
          title,
          new StartingLocation().description,
          expectedOutput,
          quitText,
        ].join('\n'),
      );
    });
  });
  describe('BAG', () => {
    it.each([['starts with empty bag', newMockInput(['BAG']), emptyBagText]])(
      '%s',
      (_testName, input, expectedOutput) => {
        const game = new Game({ input, output });

        game.play();

        expect(actualOutput()).toEqual(
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
    ])('%s', (_testName, input, bag, expectedOutput) => {
      const game = new Game({ input, output, bag });

      game.play();

      expect(actualOutput()).toEqual(
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
        map: new Map({ StartingLocation: TrumanBrewery }),
      });

      game.play();

      expect(actualOutput()).toEqual(
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
    ])('%s', (_testName, input, bag, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag,
      });

      game.play();

      expect(actualOutput()).toEqual(
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
        TrumanBreweryBasement,
        'THE TRAP DOOR HAS BEEN UNLOCKED!',
      ],
      [
        'different item that can be used here',
        newMockInput(['USE COMPASS']),
        new Bag(new Item('COMPASS')),
        Start,
        'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
      ],
      [
        "item that can't be used here",
        newMockInput(['USE KEYS']),
        new Bag(new Item('KEYS')),
        Start,
        'KEYS CANNOT BE USED HERE.',
      ],
      [
        "item that isn't in bag",
        newMockInput(['USE KEYS']),
        new Bag(),
        Start,
        'NO KEYS IN BAG',
      ],
    ])('%s', (_testName, input, bag, StartingLocation, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag,
        map: new Map({ StartingLocation }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [
          title,
          new StartingLocation().description,
          expectedOutput,
          quitText,
        ].join('\n'),
      );
    });
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
    ])('%s', (_testName, input, bag, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag,
      });

      game.play();

      expect(actualOutput()).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
});
