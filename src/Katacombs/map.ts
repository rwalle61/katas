import { getJoins, findJoin } from './joins';
import { Direction, Location as ILocation } from './types';
import * as Locations from './locations';

export default class Map {
  private locations = Object.values(Locations).map(
    (Location) => new Location(),
  );

  getLocation(locationConstructor: ILocation): ILocation {
    return this.locations.find((location) => location.is(locationConstructor));
  }

  getNextLocation(
    currentLocation: ILocation,
    directionToNextLocation: Direction,
  ): ILocation {
    const joins = getJoins(directionToNextLocation);
    const join = findJoin(joins, currentLocation, directionToNextLocation);
    const nextLocationConstructor = join[directionToNextLocation];
    return this.getLocation(nextLocationConstructor);
  }
}
