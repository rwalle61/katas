import Item from '../Item';
import { Direction } from '../types';

import Location from './Location';

const defaultItems = [new Item('KEYS'), new Item('COMPASS')];
const defaultSettings = { items: defaultItems };

export default class TrumanBrewery extends Location {
  description =
    'YOU ARE INSIDE THE MAIN ROOM OF THE TRUMAN BREWERY. THERE IS A STRONG SMELL OF HOPS AND A DOZEN EMPTY CASKS.';

  lookDescription =
    'I CAN SEE A BRICK BUILDING WITH A SIGN SAYING "TRUMAN BREWERY" AND A WOODEN WHITE DOOR.';

  doorDirection = Direction.South;

  constructor(arg = defaultSettings) {
    super(arg);
  }
}
