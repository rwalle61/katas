import * as game from '.';

describe('Game of Life', () => {
  describe('parseGrid(string)', () => {
    test.each([
      [
        '1x1',
        ' ',
        [' '],
      ],
      [
        '3x3',
        [
          '   ',
          ' X ',
          '   ',
        ].join('\n'),
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
    ])('%s', (_testName, string, expectedGrid) => {
      expect(game.parseGrid(string)).toEqual(expectedGrid);
    });
  });
  describe('tickGrid(grid)', () => {
    describe('empty grid', () => {
      test.each([
        [
          '1x1',
          [' '],
          [' '],
        ],
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tickGrid(grid)).toEqual(expectedGrid);
      });
    });
    describe('under-population', () => {
      test.each([
        [
          '0 neighbours',
          [
            '   ',
            ' X ',
            '   ',
          ],
          [
            '   ',
            '   ',
            '   ',
          ],
        ],
        [
          '1 horizontal neighbour',
          [
            '    ',
            ' XX ',
            '    ',
          ],
          [
            '    ',
            '    ',
            '    ',
          ],
        ],
        [
          '1 vertical neighbour',
          [
            '   ',
            ' X ',
            ' X ',
            '   ',
          ],
          [
            '   ',
            '   ',
            '   ',
            '   ',
          ],
        ],
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tickGrid(grid)).toEqual(expectedGrid);
      });
    });
    describe('persist', () => {
      test.each([
        [
          '2 horizontal neighbours',
          [
            '     ',
            ' XXX ',
            '     ',
          ],
          [
            '  X  ',
            '  X  ', // this cell persists
            '  X  ',
          ],
        ],
        [
          'multiple cells with 2 horizontal neighbours',
          [
            '      ',
            ' XXXX ',
            '      ',
          ],
          [
            '  XX  ',
            '  XX  ', // these cells persist
            '  XX  ',
          ],
        ],
        [
          '2 vertical neighbours',
          [
            '   ',
            ' X ',
            ' X ',
            ' X ',
            '   ',
          ],
          [
            '   ',
            '   ',
            'XXX',
            '   ',
            '   ',
          ],
        ],
        [
          '2 diagonally upwards neighbours',
          [
            '     ',
            '   X ',
            '  X  ',
            ' X   ',
            '     ',
          ],
          [
            '     ',
            '     ',
            '  X  ',
            '     ',
            '     ',
          ],
        ],
        [
          '2 diagonally downwards neighbours',
          [
            '     ',
            ' X   ',
            '  X  ',
            '   X ',
            '     ',
          ],
          [
            '     ',
            '     ',
            '  X  ',
            '     ',
            '     ',
          ],
        ],
        [
          '3 neighbours',
          [
            '    ',
            ' XX ',
            ' XX ',
            '    ',
          ],
          [
            '    ',
            ' XX ',
            ' XX ',
            '    ',
          ],
        ],
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tickGrid(grid)).toEqual(expectedGrid);
      });
    });
    describe('over-population', () => {
      test.each([
        [
          '4 neighbours',
          [
            '     ',
            ' XXX ',
            ' XXX ',
            '     ',
          ],
          [
            '  X  ',
            ' X X ', // the centre cells died
            ' X X ', // the centre cells died
            '  X  ',
          ],
        ],
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tickGrid(grid)).toEqual(expectedGrid);
      });
    });
    describe('reproduction', () => {
      test.each([
        [
          'exactly 3 neighbours',
          [
            ' X   ',
            '     ',
            ' X X ',
          ],
          [
            '     ',
            '  X  ',
            '     ',
          ],
        ],
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tickGrid(grid)).toEqual(expectedGrid);
      });
    });
  });
  describe('maintainBorder(grid)', () => {
    test.each([
      [
        'left',
        [
          '  ',
          'X ',
          '  ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'right',
        [
          '  ',
          ' X',
          '  ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'top',
        [
          ' X ',
          '   ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'bottom',
        [
          '   ',
          ' X ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'left and right',
        [
          ' ',
          'X',
          ' ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'top and bottom',
        [
          ' X ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'top and left',
        [
          'X ',
          '  ',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
      [
        'all around',
        [
          'X',
        ],
        [
          '   ',
          ' X ',
          '   ',
        ],
      ],
    ])('adds 1-cell border %s', (_testName, grid, expectedGrid) => {
      expect(game.maintainBorder(grid)).toEqual(expectedGrid);
    });
  });
  describe('tick(grid)', () => {
    describe('maintains a border', () => {
      test.each([
        [
          'at least 1 space around live cells',
          [
            '     ',
            ' XXX ',
            '     ',
          ].join('\n'),
          [
            '     ',
            '  X  ',
            '  X  ',
            '  X  ',
            '     ',
          ].join('\n'),
        ]
      ])('%s', (_testName, grid, expectedGrid) => {
        expect(game.tick(grid)).toEqual(expectedGrid);
      });
    });
  });
    describe('acceptance tests', () => {
      describe('still lifes', () => {
        test.each([
          [
            'block',
            [
              '    ',
              ' XX ',
              ' XX ',
              '    ',
            ].join('\n'),
          ],
          [
            'bee-hive',
            [
              '      ',
              '  XX  ',
              ' X  X ',
              '  XX  ',
              '      ',
            ].join('\n'),
          ],
          [
            'loaf',
            [
              '      ',
              '  XX  ',
              ' X  X ',
              '  X X ',
              '   X  ',
              '      ',
            ].join('\n'),
          ],
          [
            'boat',
            [
              '     ',
              ' XX  ',
              ' X X ',
              '  X  ',
              '     ',
            ].join('\n'),
          ],
          [
            'tub',
            [
              '     ',
              '  X  ',
              ' X X ',
              '  X  ',
              '     ',
            ].join('\n'),
          ],
        ])('%s', (_testName, grid) => {
          expect(game.tick(grid)).toEqual(grid);
        });
      });
    });
  describe('tickRepeatedly(grid, numRepeats)', () => {
    describe('oscillators', () => {
      test.each([
        [
          'blinker',
          [
            '       ',
            '       ',
            '  XXX  ',
            '       ',
            '       ',
          ].join('\n'),
          2,
        ],
        [
          'toad',
          [
            '        ',
            '        ',
            '   XXX  ',
            '  XXX   ',
            '        ',
            '        ',
          ].join('\n'),
          2,
        ],
        [
          'beacon',
          [
            '      ',
            ' XX   ',
            ' X    ',
            '    X ',
            '   XX ',
            '      ',
          ].join('\n'),
          2,
        ],
      ])('%s', (_testName, grid, period) => {
        expect(game.tickRepeatedly(grid, period)).toEqual(grid);
      });
    });
    describe('spaceships', () => {
      test.each([
        [
          'glider',
          [
            '      ',
            '  X   ',
            '   X  ',
            ' XXX  ',
            '      ',
            '      ',
          ].join('\n'),
          [
            '      ',
            '      ',
            '   X  ',
            '    X ',
            '  XXX ',
            '      ',
          ].join('\n'),
          4,
        ],
        [
          'glider (expanding grid)',
          [
            '     ',
            '  X  ',
            '   X ',
            ' XXX ',
            '     ',
          ].join('\n'),
          [
            '      ',
            '      ',
            '   X  ',
            '    X ',
            '  XXX ',
            '      ',
          ].join('\n'),
          4,
        ],
        [
          'light-weight spaceship',
          [
            '         ',
            ' X  X    ',
            '     X   ',
            ' X   X   ',
            '  XXXX   ',
            '         ',
            '         ',
          ].join('\n'),
          [
            '         ',
            '   X  X  ',
            '       X ',
            '   X   X ',
            '    XXXX ',
            '         ',
            '         ',
          ].join('\n'),
          4,
        ],
        [
          'light-weight spaceship (expanding grid)',
          [
            '       ',
            ' X  X  ',
            '     X ',
            ' X   X ',
            '  XXXX ',
            '       ',
          ].join('\n'),
          [
            '         ',
            '   X  X  ',
            '       X ',
            '   X   X ',
            '    XXXX ',
            '         ',
            '         ',
          ].join('\n'),
          4,
        ],
        [
          'middle-weight spaceship (expanding grid)',
          [
            '        ',
            '   X    ',
            ' X   X  ',
            '      X ',
            ' X    X ',
            '  XXXXX ',
            '        ',
          ].join('\n'),
          [
            '          ',
            '     X    ',
            '   X   X  ',
            '        X ',
            '   X    X ',
            '    XXXXX ',
            '          ',
            '          ',
            '          ',
          ].join('\n'),
          4,
        ],
        [
          'heavy-weight spaceship (expanding grid)',
          [
            '         ',
            '   XX    ',
            ' X    X  ',
            '       X ',
            ' X     X ',
            '  XXXXXX ',
            '         ',
          ].join('\n'),
          [
            '           ',
            '     XX    ',
            '   X    X  ',
            '         X ',
            '   X     X ',
            '    XXXXXX ',
            '           ',
            '           ',
            '           ',
          ].join('\n'),
          4,
        ],
      ])('%s', (_testName, grid, expectedGrid, period) => {
        expect(game.tickRepeatedly(grid, period)).toEqual(expectedGrid);
      });
    });
  });
});
