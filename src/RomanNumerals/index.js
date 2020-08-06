const arabicToRoman = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

const toRomanNumerals = (n) => {
  const match = arabicToRoman.find(([arabicNumber]) => n >= arabicNumber);
  if (match) {
    const [arabicNumber, romanNumeral] = match;
    return `${romanNumeral}${toRomanNumerals(n - arabicNumber)}`;
  }
  return '';
};

export default toRomanNumerals;
