import { Gold } from '../types/Gold';
import { Direction } from '../types/Direction';
import { ItemName } from '../types/ItemName';
import Item from '../Item';

type LocationConstructorArgs = {
  items?: Item[];
  gold?: Gold;
};

export default class Location {
  description: string;

  lookDescription?: string;

  doorDirection?: Direction;

  protected items: Item[];

  protected gold?: Gold;

  protected itemUsageRules: {};

  constructor({ gold, items = [] }: LocationConstructorArgs = {}) {
    this.items = items;
    this.gold = gold;
  }

  private remove(itemName: ItemName) {
    this.items = this.items.filter((item) => !item.is(itemName));
  }

  private find(itemName: ItemName) {
    return this.items.find((item) => item.is(itemName));
  }

  take(itemName: ItemName): Item {
    const item = this.find(itemName);
    this.remove(itemName);
    return item;
  }

  takeGold(): Gold {
    const { gold } = this;
    this.gold = 0;
    return gold;
  }

  add(item: Item) {
    this.items.push(item);
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
}
