const X = 'X';
const O = 'O';

const GameStates = {
  XWon: 'X Won',
  OWon: 'O Won',
  Draw: 'Draw',
  Incomplete: 'Game Incomplete',
};

const rows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const columns = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];
const diagonals = [
  [1, 5, 9],
  [3, 5, 7],
];
const lines = [...rows, ...columns, ...diagonals];

const isSubset = (array, potentialSubset) =>
  potentialSubset.every((element) => array.includes(element));

export const hasWon = (playerMoves) =>
  lines.some((line) => isSubset(playerMoves, line));

export const getNextPlayer = (currentPlayer) => (currentPlayer === X ? O : X);

export const play = (movesByX, movesByO) => {
  if (hasWon(movesByX)) {
    return GameStates.XWon;
  }
  if (hasWon(movesByO)) {
    return GameStates.OWon;
  }
  if (movesByX.length > 4) {
    return GameStates.Draw;
  }
  return GameStates.Incomplete;
};
