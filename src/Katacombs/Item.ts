import { ItemName } from './types/ItemName';

export default class Item {
  private name: ItemName;

  constructor(name: ItemName) {
    this.name = name;
  }

  toString(): string {
    return this.name;
  }

  is(itemName: ItemName): boolean {
    return itemName === this.name;
  }

  getInvalidUseText(): string {
    return `${this.name} CANNOT BE USED HERE.`;
  }
}
