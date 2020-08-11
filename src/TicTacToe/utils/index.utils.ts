export const isSubset = (array, potentialSubset): boolean =>
  potentialSubset.every((element) => array.includes(element));

export const range = (start: number, end: number): number[] =>
  Array(end + 1 - start)
    .fill(null)
    .map((_, i) => i + start);
