import toRomanNumerals from '.';

describe('toRomanNumerals(n)', () => {
  test.each([
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [9, 'IX'],
    [10, 'X'],
    [11, 'XI'],
    [14, 'XIV'],
    [19, 'XIX'],
    [40, 'XL'],
    [41, 'XLI'],
    [50, 'L'],
    [51, 'LI'],
    [90, 'XC'],
    [91, 'XCI'],
    [100, 'C'],
    [400, 'CD'],
    [401, 'CDI'],
    [500, 'D'],
    [501, 'DI'],
    [900, 'CM'],
    [901, 'CMI'],
    [1000, 'M'],
    [1001, 'MI'],
    // combinations
    [16, 'XVI'],
    [56, 'LVI'],
    [106, 'CVI'],
    // acceptance
    [42, 'XLII'],
    [846, 'DCCCXLVI'],
    [1999, 'MCMXCIX'],
    [2008, 'MMVIII'],
  ])('%i => %s', (n, expected) => {
    expect(toRomanNumerals(n)).toEqual(expected);
  });
});
