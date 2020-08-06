# Game Of Life

Implement Game of Life using object calisthenics plus everything we covered before.

For those not familiar with this game, here is a description adapted from Wikipedia: Conway's Game of Life, https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life.

The universe of Game of Life is an infinite, 2-dimensional orthogonal grid of square cells, each of which is in one of 2 possible states: alive or dead (or populated and unpopulated, respectively).

Every cell interacts with its 8 neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent.

At each step in time, the following transitions occur:

- Any live cell with fewer than 2 live neighbors dies, as if by under population
- Any live cell with 2 or 3 live neighbors lives on to the next generation
- Any live cell with more than 3 live neighbors dies, as if by overpopulation
- Any dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction

The initial pattern constitutes the seed of the system.

The first generation is created by applying the previously mentioned rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.

Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
