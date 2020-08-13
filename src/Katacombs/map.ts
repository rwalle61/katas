import { Direction, Location, LocationName } from './types';

const inverseDirection = {
  [Direction.North]: Direction.South,
  [Direction.South]: Direction.North,
  [Direction.East]: Direction.West,
  [Direction.West]: Direction.East,
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
};

const northSouthJoins = [
  {
    [Direction.North]: LocationName.Start,
    [Direction.South]: LocationName.BrickLaneMosque,
  },
  {
    [Direction.North]: LocationName.TrumanBrewery,
    [Direction.South]: LocationName.Start,
  },
];

const eastWestJoins = [
  {
    [Direction.East]: LocationName.Start,
    [Direction.West]: LocationName.PulseCinema,
  },
  {
    [Direction.East]: LocationName.BootcampPilates,
    [Direction.West]: LocationName.Start,
  },
];

const upDownJoins = [
  {
    [Direction.Up]: LocationName.TrumanBrewery1stFloor,
    [Direction.Down]: LocationName.TrumanBrewery,
  },
  {
    [Direction.Up]: LocationName.TrumanBrewery,
    [Direction.Down]: LocationName.TrumanBreweryBasement,
  },
];

const Locations = [
  {
    name: LocationName.Start,
    description: [
      'YOU ARE STANDING AT THE END OF A BRICK LANE BEFORE A SMALL BRICK BUILDING CALLED THE OLD TRUMAN BREWERY.',
      'AROUND YOU IS A FOREST OF RESTAURANTS AND BARS. A SMALL STREAM OF CRAFTED BEER FLOWS OUT OF THE BUILDING AND DOWN A GULLY.',
    ].join('\n'),
  },
  {
    name: LocationName.TrumanBrewery,
    description:
      'YOU ARE INSIDE THE MAIN ROOM OF THE TRUMAN BREWERY. THERE IS A STRONG SMELL OF HOPS AND A DOZEN EMPTY CASKS.',
    lookDescription:
      'I CAN SEE A BRICK BUILDING WITH A SIGN SAYING "TRUMAN BREWERY" AND A WOODEN WHITE DOOR.',
  },
  {
    name: LocationName.TrumanBrewery1stFloor,
    description: 'YOU ARE UPSTAIRS IN THE TRUMAN BREWERY.',
  },
  {
    name: LocationName.TrumanBreweryBasement,
    description: 'YOU ARE DOWNSTAIRS IN THE TRUMAN BREWERY.',
  },
  {
    name: LocationName.BrickLaneMosque,
    description:
      'YOU ARE BY A LARGE MOSQUE, WITH PEOPLE IN ROBES WEAVING AROUND YOU.',
    lookDescription:
      'I CAN SEE PEOPLE IN ROBES STREAMING INTO A LARGE MOSQUE WITH A TALL MINARET.',
  },
  {
    name: LocationName.PulseCinema,
    description:
      "YOU ARE STANDING BY A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'. INDEED, YOU HEAR FAINT PULSES FROM INSIDE IT.",
    lookDescription:
      "I CAN SEE A LARGE BOXY BUILDING WITH A BOLD SIGN SAYING 'PULSE'.",
  },
  {
    name: LocationName.BootcampPilates,
    description:
      'YOU ARE STANDING AMONG A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
    lookDescription:
      'I CAN SEE A GROUP OF NIMBLE BETHNELLIANS STRETCHING ON THE FLOOR.',
  },
];

export const getLocation = (locationName: LocationName) =>
  Locations.find((location) => location.name === locationName);

const findJoin = (joins, nameOfCurrentLocation, direction) =>
  joins.find(
    (join) => join[inverseDirection[direction]] === nameOfCurrentLocation,
  );

const getJoins = (direction) => {
  if ([Direction.North, Direction.South].includes(direction)) {
    return northSouthJoins;
  }
  if ([Direction.East, Direction.West].includes(direction)) {
    return eastWestJoins;
  }
  return upDownJoins;
};

export const getNextLocation = (nameOfCurrentLocation, direction): Location => {
  const joins = getJoins(direction);
  const join = findJoin(joins, nameOfCurrentLocation, direction);
  const nameOfNextLocation = join[direction];
  return getLocation(nameOfNextLocation);
};
