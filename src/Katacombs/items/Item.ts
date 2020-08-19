import { ItemName } from '../types/ItemName';

export default class Item {
  protected name: ItemName;

  private usesRemaining: number;

  constructor(name: ItemName, usesRemaining = Infinity) {
    this.name = name;
    this.usesRemaining = usesRemaining;
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

  use(): void {
    this.usesRemaining -= 1;
  }

  hasDegraded(): boolean {
    return this.usesRemaining < 1;
  }
}
