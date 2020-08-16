import {
  JoinsDirectory,
  Direction,
  Location as ILocation,
  LocationConstructor,
} from './types';
import { defaultJoins, getLocations, findJoin } from './joins';
import { Start } from './locations';

type MapConstructorArgs = {
  joins?: JoinsDirectory;
  StartingLocation?: LocationConstructor;
};

export default class Map {
  private locations: ILocation[];

  private StartingLocation: LocationConstructor;

  private joins: JoinsDirectory;

  constructor({
    joins = defaultJoins,
    StartingLocation = Start,
  }: MapConstructorArgs = {}) {
    this.initialiseLocations(joins);
    this.joins = joins;
    this.StartingLocation = StartingLocation;
  }

  initialiseLocations(joins) {
    this.locations = getLocations(joins).map((Location) => new Location());
  }

  getLocation(locationConstructor: LocationConstructor): ILocation {
    return this.locations.find((location) => location.is(locationConstructor));
  }

  getStartingLocation(): ILocation {
    return this.getLocation(this.StartingLocation);
  }

  getNextLocation(
    currentLocation: ILocation,
    directionToNextLocation: Direction,
  ): ILocation {
    const join = findJoin(this.joins, currentLocation, directionToNextLocation);
    if (!join) {
      return null;
    }
    const nextLocationConstructor = join[directionToNextLocation];
    return this.getLocation(nextLocationConstructor);
  }
}
