import Game from '.';
import Bag from './Bag';
import Item from './items/Item';
import Map from './Map';
import {
  Start,
  TrumanBrewery,
  TrumanBreweryBasement,
  TrumanBrewery1stFloor,
} from './locations';
import Compass from './items/Compass';

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
      [
        'Direction is locked',
        newMockInput(['GO DOWN']),
        TrumanBreweryBasement,
        'TRAPDOOR IS LOCKED!',
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
          { TrumanBrewery: { gold: 0 } },
          [new TrumanBrewery().description, 'THE BAG CONTAINS: KEYS'].join(
            '\n',
          ),
        ],
        [
          'location with gold',
          newMockInput(['GO N', 'BAG']),
          { TrumanBrewery: { gold: 5 } },
          [
            new TrumanBrewery().description,
            'YOU FIND 5 GOLD!',
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
        [
          'location with different amount of gold',
          newMockInput(['GO N', 'BAG']),
          { TrumanBrewery: { gold: 6 } },
          [
            new TrumanBrewery().description,
            'YOU FIND 6 GOLD!',
            'THE BAG CONTAINS: KEYS, 6 GOLD',
          ].join('\n'),
        ],
        [
          'returning to a location that no longer has gold',
          newMockInput(['GO N', 'GO S', 'GO N', 'BAG']),
          { TrumanBrewery: { gold: 5 } },
          [
            new TrumanBrewery().description,
            'YOU FIND 5 GOLD!',
            new Start().description,
            new TrumanBrewery().description,
            'THE BAG CONTAINS: KEYS, 5 GOLD',
          ].join('\n'),
        ],
        [
          'collecting gold multiple times',
          newMockInput(['GO N', 'GO UP', 'BAG']),
          { TrumanBrewery: { gold: 5 }, TrumanBrewery1stFloor: { gold: 1 } },
          [
            new TrumanBrewery().description,
            'YOU FIND 5 GOLD!',
            new TrumanBrewery1stFloor().description,
            'YOU FIND 1 GOLD!',
            'THE BAG CONTAINS: KEYS, 6 GOLD',
          ].join('\n'),
        ],
      ])('%s', (_testName, input, itemMap, expectedOutput) => {
        const game = new Game({
          input,
          output,
          map: new Map({ itemMap }),
          bag: new Bag({ items: [new Item('KEYS')] }),
        });

        game.play();

        expect(actualOutput()).toEqual(
          [title, new Start().description, expectedOutput, quitText].join('\n'),
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
        [new Item('SOME KEYS')],
        'THE BAG CONTAINS: SOME KEYS',
      ],
      [
        'different item in bag',
        newMockInput(['BAG']),
        [new Item('A COMPASS')],
        'THE BAG CONTAINS: A COMPASS',
      ],
      [
        'multiple items in bag',
        newMockInput(['BAG']),
        [new Item('SOME KEYS'), new Item('A COMPASS')],
        'THE BAG CONTAINS: SOME KEYS, A COMPASS',
      ],
    ])('%s', (_testName, input, startingItems, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag: new Bag({ items: startingItems }),
      });

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
        map: new Map({
          itemMap: {
            Start: { items: [new Item('KEYS'), new Compass()] },
          },
        }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });

    it.each([
      [
        'cannot take more items when bag is full',
        newMockInput(['TAKE KEYS', 'BAG', 'TAKE KEYS']),
        1,
        [
          'THE BAG IS FULL!',
          'THE BAG CONTAINS: SOMETHING',
          'THE BAG IS FULL!',
        ].join('\n'),
      ],
      [
        'cannot take more items when bag is full (default capacity = 10)',
        newMockInput(['TAKE KEYS', 'BAG', 'TAKE KEYS']),
        10,
        [
          'THE BAG IS FULL!',
          'THE BAG CONTAINS: SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING, SOMETHING',
          'THE BAG IS FULL!',
        ].join('\n'),
      ],
    ])('%s', (_testName, input, bagCapacity, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag: new Bag({
          items: [...Array(bagCapacity).fill(new Item('SOMETHING'))],
          capacity: bagCapacity,
        }),
        map: new Map({
          itemMap: {
            Start: { items: [new Item('KEYS')] },
          },
        }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
  describe('DROP', () => {
    it.each([
      [
        'item',
        newMockInput(['DROP KEYS', 'BAG']),
        [new Item('KEYS')],
        ['KEYS: DROPPED', emptyBagText].join('\n'),
      ],
      [
        'different item',
        newMockInput(['DROP COMPASS', 'BAG']),
        [new Compass()],
        ['COMPASS: DROPPED', emptyBagText].join('\n'),
      ],
      [
        'item remaining in bag',
        newMockInput(['DROP COMPASS', 'BAG']),
        [new Item('KEYS'), new Compass()],
        ['COMPASS: DROPPED', 'THE BAG CONTAINS: KEYS'].join('\n'),
      ],
      ['item not in bag', newMockInput(['DROP KEYS']), [], 'NO KEYS IN BAG'],
    ])('%s', (_testName, input, startingItems, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag: new Bag({ items: startingItems }),
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
        newMockInput(['GO DOWN', 'USE KEYS', 'GO DOWN']),
        [new Item('KEYS')],
        TrumanBreweryBasement,
        [
          'TRAPDOOR IS LOCKED!',
          'THE TRAP DOOR HAS BEEN UNLOCKED!',
          'YOU ARE IN THE TRUMAN BREWERY SECRET LAIR.',
        ].join('\n'),
      ],
      [
        'item that can be used anywhere',
        newMockInput(['USE COMPASS', 'GO N', 'USE COMPASS']),
        [new Compass()],
        Start,
        [
          'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
          new TrumanBrewery().description,
          'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
        ].join('\n'),
      ],
      [
        'item that can be used infinite times',
        newMockInput(['USE COMPASS', 'USE COMPASS']),
        [new Compass()],
        Start,
        [
          'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
          'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
        ].join('\n'),
      ],
      [
        "item that can't be used here",
        newMockInput(['USE KEYS']),
        [new Item('KEYS')],
        Start,
        'KEYS CANNOT BE USED HERE.',
      ],
      [
        "item that isn't in bag",
        newMockInput(['USE KEYS']),
        [],
        Start,
        'NO KEYS IN BAG',
      ],
      [
        'item that disappears after use',
        newMockInput(['USE CHIP-SHOP-CHIPS', 'USE CHIP-SHOP-CHIPS']),
        [new Item('CHIP-SHOP-CHIPS', 1)],
        Start,
        ['YUMMMMY', 'NO CHIP-SHOP-CHIPS IN BAG'].join('\n'),
      ],
    ])(
      '%s',
      (_testName, input, startingItems, StartingLocation, expectedOutput) => {
        const game = new Game({
          input,
          output,
          bag: new Bag({ items: startingItems }),
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
      },
    );
  });
  describe('INTEGRATION: TAKE + DROP', () => {
    it.each([
      [
        'cannot take, drop, take, cannot take',
        newMockInput(['TAKE KEYS', 'DROP KEYS', 'TAKE KEYS', 'TAKE KEYS']),
        [new Item('KEYS')],
        ['NO KEYS HERE!', 'KEYS: DROPPED', 'KEYS: TAKEN', 'NO KEYS HERE!'].join(
          '\n',
        ),
      ],
    ])('%s', (_testName, input, startingItems, expectedOutput) => {
      const game = new Game({
        input,
        output,
        bag: new Bag({ items: startingItems }),
      });

      game.play();

      expect(actualOutput()).toEqual(
        [title, new Start().description, expectedOutput, quitText].join('\n'),
      );
    });
  });
});
