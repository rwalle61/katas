import isLeapYear from '.';

describe('isLeapYear(year)', () => {
  test.each([
    ['not divisible by 4', 1, false],
    ['divisible by 4', 4, true],
    ['divisible by 4 and 100 but not 400', 200, false],
    ['divisible by 4 and 100 and 400', 400, true],
    // Acceptance
    ['typical common year (not divisible by 4)', 2001, false],
    ['typical leap year (divisible by 4 but not 100)', 1996, true],
    ['atypical common year (divisible by 4 and 100 but not 400)', 1900, false],
    ['atypical leap year (divisible by 4 and 100 and 400)', 2000, true],
  ])('%s: %i => %s', (_testName, year, expectedBoolean) => {
    expect(isLeapYear(year)).toEqual(expectedBoolean);
  });
});
