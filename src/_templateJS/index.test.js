import foo from '.';

/**
 *
 */

describe('foo(n)', () => {
  it('returns 1', () => {
    expect(foo()).toEqual(1);
  });
  test.each([['1', 1]])('%s => %i', (input, expected) => {
    expect(foo(input)).toEqual(expected);
  });
});
