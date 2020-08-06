import fibonacci from '.';

describe('fibonacci(n)', () => {
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
    [6, 8],
    // Acceptance
    [7, 13],
    [8, 21],
    [9, 34],
  ])('%i => %i', (n, expected) => {
    expect(fibonacci(n)).toEqual(expected);
  });
});
