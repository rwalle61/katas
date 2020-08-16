import { Direction } from '../types';
import Location from './Location';

export default class Start extends Location {
  description = [
    'YOU ARE STANDING AT THE END OF A BRICK LANE BEFORE A SMALL BRICK BUILDING CALLED THE OLD TRUMAN BREWERY.',
    'AROUND YOU IS A FOREST OF RESTAURANTS AND BARS. A SMALL STREAM OF CRAFTED BEER FLOWS OUT OF THE BUILDING AND DOWN A GULLY.',
  ].join('\n');

  doors = [{ name: 'DOOR', direction: Direction.North }];

  itemUsageRules = {
    COMPASS: () => 'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH',
  };
}
