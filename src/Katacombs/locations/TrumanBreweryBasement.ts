import { Direction } from '../types/Direction';
import Location from './Location';

export default class TrumanBreweryBasement extends Location {
  description = 'YOU ARE DOWNSTAIRS IN THE TRUMAN BREWERY.';

  lookDescription = 'I CAN SEE DOWNSTAIRS IN THE TRUMAN BREWERY.';

  itemUsageRules = {
    KEYS: () => {
      this.doors[0].locked = false;
      return 'THE TRAP DOOR HAS BEEN UNLOCKED!';
    },
  };

  doors = [{ name: 'DOOR', direction: Direction.Down, locked: true }];
}
