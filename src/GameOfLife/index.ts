const LiveCell = 'X';
const DeadCell = ' ';
const isAlive = (cell) => cell === LiveCell;

const willBeAlive = (cell, numNeighbours) =>
  numNeighbours === 3 || (isAlive(cell) && numNeighbours === 2);

const tickCell = (cell, numNeighbours) =>
  willBeAlive(cell, numNeighbours) ? LiveCell : DeadCell;

const getCell = (row, j) => row && row[j];

const getNeighbouringCells = (grid, i, j) => {
  const row = grid[j];
  const rowAbove = grid[j - 1];
  const rowBelow = grid[j + 1];
  return [
    getCell(rowAbove, i - 1),
    getCell(rowAbove, i),
    getCell(rowAbove, i + 1),
    getCell(row, i - 1),
    getCell(row, i + 1),
    getCell(rowBelow, i - 1),
    getCell(rowBelow, i),
    getCell(rowBelow, i + 1),
  ];
};

const numNeighbours = (grid, i, j) => {
  const neighbouringCells = getNeighbouringCells(grid, i, j);
  return neighbouringCells.filter(isAlive).length;
};

const CELL_DELIMITER = '';
const getCells = (row) => row.split(CELL_DELIMITER);

const EMPTY_ROW = '';
const tickRow = (grid, row, j) =>
  getCells(row).reduce(
    (accumulator, cell, i) =>
      `${accumulator}${tickCell(cell, numNeighbours(grid, i, j))}`,
    EMPTY_ROW,
  );

export const tickGrid = (grid) => grid.map((row, j) => tickRow(grid, row, j));

const getLeftmostCell = (row) => row[0];
const getRightmostCell = (row) => row[row.length - 1];

const doesLeftColumnContainLiveCells = (grid) =>
  grid.some((row) => isAlive(getLeftmostCell(row)));

const doesRightColumnContainLiveCells = (grid) =>
  grid.some((row) => isAlive(getRightmostCell(row)));

const getTopRow = (grid) => grid[0];
const getBottomRow = (grid) => grid[grid.length - 1];
const getWidth = (grid) => getTopRow(grid).length;
const getBlankRow = (grid) => DeadCell.repeat(getWidth(grid));
const addTopBorder = (grid) => [getBlankRow(grid), ...grid];
const addBottomBorder = (grid) => [...grid, getBlankRow(grid)];

const doesRowContainLiveCells = (row) =>
  getCells(row).some((cell) => isAlive(cell));

const Borders = {
  Left: {
    containsLiveCells: doesLeftColumnContainLiveCells,
    extendGrid: (grid) => grid.map((row) => `${DeadCell}${row}`),
  },
  Right: {
    containsLiveCells: doesRightColumnContainLiveCells,
    extendGrid: (grid) => grid.map((row) => `${row}${DeadCell}`),
  },
  Top: {
    containsLiveCells: (grid) => doesRowContainLiveCells(getTopRow(grid)),
    extendGrid: addTopBorder,
  },
  Bottom: {
    containsLiveCells: (grid) => doesRowContainLiveCells(getBottomRow(grid)),
    extendGrid: addBottomBorder,
  },
};

const findBorderContainingLiveCells = (grid) => {
  const containsLiveCells = (border) => border.containsLiveCells(grid);
  return Object.values(Borders).find(containsLiveCells);
};

export const maintainBorder = (grid) => {
  const borderContainingLiveCells = findBorderContainingLiveCells(grid);
  return borderContainingLiveCells
    ? maintainBorder(borderContainingLiveCells.extendGrid(grid))
    : grid;
};

const ROW_DELIMETER = '\n';

export const parseGrid = (string) => string.split(ROW_DELIMETER);

const renderGrid = (grid) => grid.join(ROW_DELIMETER);

export const tick = (gridString) => {
  const grid = parseGrid(gridString);
  const tickedGrid = tickGrid(grid);
  const borderedGrid = maintainBorder(tickedGrid);
  return renderGrid(borderedGrid);
};

const compoundFunc = (func, arg, repeats) =>
  repeats === 1 ? func(arg) : compoundFunc(func, func(arg), repeats - 1);

export const tickRepeatedly = (gridString, numRepeats) =>
  compoundFunc(tick, gridString, numRepeats);
