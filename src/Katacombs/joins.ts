import unique from 'array-unique';
import flatten from 'arr-flatten';
import * as Locations from './locations';
import {
  Location,
  LocationConstructor,
  Direction,
  Axes,
  JoinsDirectory,
  Join,
} from './types';

export const defaultJoins = {
  [Axes.NorthSouth]: [
    {
      [Direction.North]: Locations.Start,
      [Direction.South]: Locations.BrickLaneMosque,
    },
    {
      [Direction.North]: Locations.TrumanBrewery,
      [Direction.South]: Locations.Start,
    },
  ],
  [Axes.EastWest]: [
    {
      [Direction.East]: Locations.Start,
      [Direction.West]: Locations.PulseCinema,
    },
    {
      [Direction.East]: Locations.BootcampPilates,
      [Direction.West]: Locations.Start,
    },
  ],
  [Axes.UpDown]: [
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

export const getLocations = (joins: JoinsDirectory): LocationConstructor[] => {
  const listOfJoins = flatten(Object.values(joins));
  const locations = flatten(listOfJoins.map((join) => Object.values(join)));
  return unique(locations);
};

const DirectionToJoinAxis = {
  [Direction.North]: Axes.NorthSouth,
  [Direction.South]: Axes.NorthSouth,
  [Direction.East]: Axes.EastWest,
  [Direction.West]: Axes.EastWest,
  [Direction.Up]: Axes.UpDown,
  [Direction.Down]: Axes.UpDown,
};

const InverseDirection = {
  [Direction.North]: Direction.South,
  [Direction.South]: Direction.North,
  [Direction.East]: Direction.West,
  [Direction.West]: Direction.East,
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
};

export const findJoin = (
  joins: JoinsDirectory,
  currentLocation: Location,
  directionToNextLocation: Direction,
): Join => {
  const axis = DirectionToJoinAxis[directionToNextLocation];
  const joinsAlongAxis = joins[axis];
  const inverseDirection = InverseDirection[directionToNextLocation];
  return joinsAlongAxis.find((join) =>
    currentLocation.is(join[inverseDirection]),
  );
};
