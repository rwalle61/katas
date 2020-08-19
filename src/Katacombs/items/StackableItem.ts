import { ItemName } from '../types/ItemName';
import Item from './Item';

export default class StackableItem extends Item {
  private quantity: number;

  constructor(name: ItemName, quantity = 1) {
    super(name);
    this.quantity = quantity;
  }

  toString(): string {
    return `${this.quantity} ${super.toString()}`;
  }

  increment(quantity) {
    this.quantity += quantity;
  }
}
