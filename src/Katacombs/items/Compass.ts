import Item from './Item';

export default class Compass extends Item {
  constructor() {
    super('COMPASS');
  }

  use() {
    return 'THE COMPASS SPINS AND SPINS, FINALLY SETTLING NORTH';
  }
}
