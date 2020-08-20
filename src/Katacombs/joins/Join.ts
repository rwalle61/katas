import { Direction } from '../types/Direction';
import { LocationConstructor } from '../locations/Location';

type LocationInDirection = {
  Location: LocationConstructor;
  direction: Direction;
};

export class Join {
  private Location1: LocationInDirection;

  private Location2: LocationInDirection;

  locked: boolean;

  constructor(
    Location1: LocationInDirection,
    Location2: LocationInDirection,
    locked = false,
  ) {
    this.Location1 = Location1;
    this.Location2 = Location2;
    this.locked = locked;
  }

  getLocations() {
    return [this.Location1.Location, this.Location2.Location];
  }

  getLocation(direction: Direction): LocationConstructor {
    return this.Location1.direction === direction
      ? this.Location1.Location
      : this.Location2.Location;
  }
}

export class NorthSouthJoin extends Join {
  constructor(
    NorthLocation: LocationConstructor,
    SouthLocation: LocationConstructor,
    locked?: boolean,
  ) {
    super(
      { direction: Direction.North, Location: NorthLocation },
      { direction: Direction.South, Location: SouthLocation },
      locked,
    );
  }
}

export class EastWestJoin extends Join {
  constructor(
    EastLocation: LocationConstructor,
    WestLocation: LocationConstructor,
    locked?: boolean,
  ) {
    super(
      { direction: Direction.East, Location: EastLocation },
      { direction: Direction.West, Location: WestLocation },
      locked,
    );
  }
}

export class UpDownJoin extends Join {
  constructor(
    UpLocation: LocationConstructor,
    DownLocation: LocationConstructor,
    locked?: boolean,
  ) {
    super(
      { direction: Direction.Up, Location: UpLocation },
      { direction: Direction.Down, Location: DownLocation },
      locked,
    );
  }
}
