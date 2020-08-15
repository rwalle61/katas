import { Direction } from './types/Direction';
import * as Locations from './locations';

const Joins = {
  northSouth: [
    {
      [Direction.North]: Locations.Start,
      [Direction.South]: Locations.BrickLaneMosque,
    },
    {
      [Direction.North]: Locations.TrumanBrewery,
      [Direction.South]: Locations.Start,
    },
  ],
  eastWest: [
    {
      [Direction.East]: Locations.Start,
      [Direction.West]: Locations.PulseCinema,
    },
    {
      [Direction.East]: Locations.BootcampPilates,
      [Direction.West]: Locations.Start,
    },
  ],
  upDown: [
    {
      [Direction.Up]: Locations.TrumanBrewery1stFloor,
      [Direction.Down]: Locations.TrumanBrewery,
    },
    {
      [Direction.Up]: Locations.TrumanBrewery,
      [Direction.Down]: Locations.TrumanBreweryBasement,
    },
    {
      [Direction.Up]: Locations.TrumanBreweryBasement,
      [Direction.Down]: Locations.TrumanBreweryLair,
    },
    {
      [Direction.Up]: Locations.TrumanBreweryLair,
      [Direction.Down]: Locations.TrumanBrewerySubLair,
    },
  ],
};

export const getJoins = (directionToNextLocation: Direction) => {
  if ([Direction.North, Direction.South].includes(directionToNextLocation)) {
    return Joins.northSouth;
  }
  if ([Direction.East, Direction.West].includes(directionToNextLocation)) {
    return Joins.eastWest;
  }
  return Joins.upDown;
};

const inverseDirection = {
  [Direction.North]: Direction.South,
  [Direction.South]: Direction.North,
  [Direction.East]: Direction.West,
  [Direction.West]: Direction.East,
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
};

export const findJoin = (joins, currentLocation, directionToNextLocation) =>
  joins.find((join) =>
    currentLocation.is(join[inverseDirection[directionToNextLocation]]),
  );
