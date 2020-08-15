import Location from './Location';

const defaultSettings = { gold: 6 };

export default class TrumanBrewerySubLair extends Location {
  description = 'YOU ARE IN THE TRUMAN BREWERY SECRET SUB LAIR.';

  constructor(arg = defaultSettings) {
    super(arg);
  }
}
