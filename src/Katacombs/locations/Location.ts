import { ObjectName } from '../types/ObjectName';
import { Door } from '../types/Door';
import { Gold } from '../types/Gold';
import { ItemName } from '../types/ItemName';
import Item from '../Item';

type LocationConstructorArgs = {
  items?: Item[];
  gold?: Gold;
};

export type LocationConstructor = {
  new (LocationConstructorArgs): Location;
};

export default class Location {
  description: string;

  lookDescription?: string;

  doors: Door[] = [];

  protected items: Item[];

  protected gold?: Gold;

  protected itemUsageRules: {};

  constructor({ gold, items = [] }: LocationConstructorArgs = {}) {
    this.items = items;
    this.gold = gold;
  }

  add(item: Item) {
    this.items.push(item);
  }

  remove(itemName: ItemName) {
    this.items = this.items.filter((item) => !item.is(itemName));
  }

  find(itemName: ItemName) {
    return this.items.find((item) => item.is(itemName));
  }

  takeGold(): Gold {
    const { gold } = this;
    this.gold = 0;
    return gold;
  }

  use(item: Item): string {
    const usageRule = this.itemUsageRules[item.toString()];
    if (!usageRule) {
      return item.getInvalidUseText();
    }
    const useText = usageRule();
    return useText;
  }

  is(constructor): boolean {
    return constructor === this.constructor;
  }

  getOpenableObject(objectName: ObjectName) {
    return this.doors.find((door) => door.name === objectName);
  }
}
