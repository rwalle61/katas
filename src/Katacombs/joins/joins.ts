import unique from 'array-unique';
import flatten from 'arr-flatten';
import { Join, NorthSouthJoin, EastWestJoin, UpDownJoin } from './Join';
import * as Locations from '../locations';
import {
  Location,
  LocationConstructor,
  Direction,
  Axes,
  JoinsDirectory,
} from '../types';

export const defaultJoins = {
  [Axes.NorthSouth]: [
    new NorthSouthJoin(Locations.Start, Locations.BrickLaneMosque),
    new NorthSouthJoin(Locations.TrumanBrewery, Locations.Start),
  ],
  [Axes.EastWest]: [
    new EastWestJoin(Locations.Start, Locations.PulseCinema),
    new EastWestJoin(Locations.BootcampPilates, Locations.Start),
  ],
  [Axes.UpDown]: [
    new UpDownJoin(Locations.TrumanBrewery1stFloor, Locations.TrumanBrewery),
    new UpDownJoin(Locations.TrumanBrewery, Locations.TrumanBreweryBasement),
    new UpDownJoin(
      Locations.TrumanBreweryBasement,
      Locations.TrumanBreweryLair,
    ),
  ],
};

export const getLocations = (joins: JoinsDirectory): LocationConstructor[] => {
  const listOfJoins = flatten(Object.values(joins));
  const locations = flatten(listOfJoins.map((join) => join.getLocations()));
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
    currentLocation.is(join.getLocation(inverseDirection)),
  );
};
