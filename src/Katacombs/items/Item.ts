import { ItemName } from '../types/ItemName';

export default class Item {
  protected name: ItemName;

  constructor(name: ItemName) {
    this.name = name;
  }

  toString(): string {
    return this.name.toUpperCase();
  }

  is(itemName: ItemName): boolean {
    return itemName === this.name;
  }

  getInvalidUseText(): string {
    return `${this.name} CANNOT BE USED HERE.`;
  }
}
