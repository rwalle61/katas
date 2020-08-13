export enum Command {
  Quit = 'QUIT',
  Help = 'HELP',
  Look = 'LOOK',
  Move = 'GO',
}

export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
  Up = 'UP',
  Down = 'DOWN',
}

export type Location = any;

export enum LocationName {
  Start,
  TrumanBrewery,
  TrumanBrewery1stFloor,
  TrumanBreweryBasement,
  BootcampPilates,
  BrickLaneMosque,
  PulseCinema,
}
