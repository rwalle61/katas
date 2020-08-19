import {
  JoinsDirectory,
  Direction,
  Location as ILocation,
  LocationConstructor,
  Gold,
} from './types';
import { defaultJoins, getLocations, findJoin } from './joins';
import { Start } from './locations';
import Item from './Item';

type ItemMap = {
  [Location in LocationConstructor['name']]: { items?: Item[]; gold?: Gold };
};

type MapConstructorArgs = {
  joins?: JoinsDirectory;
  StartingLocation?: LocationConstructor;
  itemMap?: ItemMap;
};

export default class Map {
  private locations: ILocation[];

  private StartingLocation: LocationConstructor;

  private joins: JoinsDirectory;

  constructor({
    joins = defaultJoins,
    StartingLocation = Start,
    itemMap = {},
  }: MapConstructorArgs = {}) {
    this.initialiseLocations(joins, itemMap);
    this.joins = joins;
    this.StartingLocation = StartingLocation;
  }

  initialiseLocations(joins: JoinsDirectory, itemMap: ItemMap) {
    this.locations = getLocations(joins).map(
      (Location) => new Location(itemMap[Location.name]),
    );
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
