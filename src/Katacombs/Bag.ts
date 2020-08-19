import { Gold } from './types/Gold';
import { ItemName } from './types/ItemName';
import Item from './Item';

type BagConstructorArgs = {
  items?: Item[];
  capacity?: number;
};

const emptyBagText = 'THE BAG IS EMPTY. IT LOOKS BIG ENOUGH FOR 10 ITEMS';
const defaultCapacity = 10;

export default class Bag {
  private items: Item[];

  private capacity: number;

  constructor({
    items = [],
    capacity = defaultCapacity,
  }: BagConstructorArgs = {}) {
    this.items = items;
    this.capacity = capacity;
  }

  static getItemNotFoundText(itemName: ItemName): string {
    return `NO ${itemName} IN BAG`;
  }

  private getBagContents(): string {
    return `THE BAG CONTAINS: ${`${this.items
      .map((item) => item.toString())
      .join(', ')}`}`;
  }

  add(item: Item): void {
    this.items.push(item);
  }

  remove(itemName: ItemName): void {
    this.items = this.items.filter(
      (existingItem) => !existingItem.is(itemName),
    );
  }

  addGold(amount: Gold): void {
    this.add(new Item(`${amount} GOLD`));
  }

  find(itemName: ItemName): Item {
    return this.items.find((item) => item.is(itemName));
  }

  toString(): string {
    return this.items.length ? this.getBagContents() : emptyBagText;
  }

  isFull(): boolean {
    return this.items.length >= this.capacity;
  }
}
