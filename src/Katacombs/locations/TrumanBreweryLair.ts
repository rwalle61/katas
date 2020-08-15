import Location from './Location';

const defaultSettings = { gold: 5 };

export default class TrumanBreweryLair extends Location {
  description = 'YOU ARE IN THE TRUMAN BREWERY SECRET LAIR.';

  constructor(arg = defaultSettings) {
    super(arg);
  }
}
