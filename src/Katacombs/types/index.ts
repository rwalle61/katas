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

export { default as Location } from '../locations/Location';
export { ItemName } from './ItemName';
export { Direction } from './Direction';
