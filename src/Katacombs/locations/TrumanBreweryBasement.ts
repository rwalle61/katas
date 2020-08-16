import Location from './Location';

export default class TrumanBreweryBasement extends Location {
  description = 'YOU ARE DOWNSTAIRS IN THE TRUMAN BREWERY.';

  lookDescription = 'I CAN SEE DOWNSTAIRS IN THE TRUMAN BREWERY.';

  itemUsageRules = {
    KEYS: () => 'THE TRAP DOOR HAS BEEN UNLOCKED!',
  };
}
