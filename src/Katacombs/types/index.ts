import { Join } from '../joins/Join';
import { Direction } from './Direction';
import Location, { LocationConstructor } from '../locations/Location';

export enum Command {
  Quit = 'QUIT',
  Help = 'HELP',
  Look = 'LOOK',
  Move = 'GO',
  Open = 'OPEN',
  Bag = 'BAG',
  Take = 'TAKE',
  Drop = 'DROP',
  Use = 'USE',
}

export { ItemName } from './ItemName';
export { ObjectName } from './ObjectName';
export { Door } from './Door';

export enum Axes {
  NorthSouth = 'NorthSouth',
  EastWest = 'EastWest',
  UpDown = 'UpDown',
}

export type JoinsDirectory = {
  [axis in Axes]?: Join[];
};

export { Direction, Location, LocationConstructor };
