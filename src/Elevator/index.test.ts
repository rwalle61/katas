import * as elevator from '.';

const arrayToCall = ([pickupFloor, dropoffFloor]: number[]): {
  pickupFloor: number;
  dropoffFloor: number;
} => ({ pickupFloor, dropoffFloor });

describe('elevator', () => {
  describe('.callOnce(pickupFloor, dropoffFloor)', () => {
    test.each([
      [3, -1],
      [0, -1],
    ])('%i, %i', (pickupFloor, dropoffFloor) => {
      expect(elevator.callOnce({ pickupFloor, dropoffFloor })).toEqual([
        pickupFloor,
        dropoffFloor,
      ]);
    });
  });
  describe('.callSequentially(calls)', () => {
    test('Acceptance test', () => {
      const calls = [
        [3, -1],
        [0, -1],
        [2, -1],
        [1, 3],
      ].map(arrayToCall);
      const expectedStops = [3, -1, 0, -1, 2, -1, 1, 3];
      expect(elevator.callSequentially(calls)).toEqual(expectedStops);
    });
  });
  describe('.callInBatch(calls)', () => {
    test.each([
      ['1 downward call', [[1, 0]], [1, 0]],
      [
        'downward calls in order',
        [
          [2, 0],
          [1, 0],
        ],
        [2, 1, 0],
      ],
      [
        'downward calls not in order',
        [
          [1, 0],
          [2, 0],
        ],
        [2, 1, 0],
      ],
      ['1 upward call', [[0, 1]], [0, 1]],
      [
        'upward calls in order',
        [
          [0, 1],
          [0, 2],
        ],
        [0, 1, 2],
      ],
      [
        'upward calls not in order',
        [
          [0, 2],
          [0, 1],
        ],
        [0, 1, 2],
      ],
      [
        'duplicated calls',
        [
          [0, 1],
          [0, 1],
        ],
        [0, 1],
      ],
      [
        '1 downward then upward call',
        [
          [1, 0],
          [-1, 1],
        ],
        [1, 0, -1, 1],
      ],
      [
        '1 upward then downward call',
        [
          [0, 1],
          [2, 0],
        ],
        [0, 1, 2, 0],
      ],
      [
        'multiple downward then upward calls',
        [
          [1, 0],
          [2, 0],
          [-1, 2],
          [1, 2],
        ],
        [2, 1, 0, -1, 1, 2],
      ],
      [
        'change of direction on same floor (down -> up)',
        [
          [2, 0],
          [1, 0],
          [0, 1],
          [0, 2],
        ],
        [2, 1, 0, 1, 2],
      ],
      [
        'change of direction on same floor (up -> down)',
        [
          [0, 1],
          [0, 2],
          [2, 0],
          [1, 0],
        ],
        [0, 1, 2, 1, 0],
      ],
      [
        'Acceptance test',
        [
          [3, -1],
          [0, -1],
          [2, -1],
          [1, 3],
        ],
        [3, 2, 0, -1, 1, 3],
      ],
    ])('%s', (_testName, callsAsArray, expectedStops) => {
      const calls = callsAsArray.map(arrayToCall);
      expect(elevator.callInBatch(calls)).toEqual(expectedStops);
    });
  });
});
