export enum Player {
  X = 'X',
  O = 'O',
}

export enum GameState {
  XWon,
  OWon,
  Draw,
  Incomplete,
}

type Move = number;

export type Moves = Move[];

export type PlayersMoves = {
  [Player.X]: Moves;
  [Player.O]: Moves;
};

export const newPlayersMoves = (
  movesByX: Moves,
  movesByO: Moves,
): PlayersMoves => ({
  [Player.X]: movesByX,
  [Player.O]: movesByO,
});

export type Line = Move[];
