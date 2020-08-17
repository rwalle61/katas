type Day = number;
type OrderID = number;
type Date = moment.Moment;

export class Supplier {
  leadTime: Day;

  constructor({ leadTime }) {
    this.leadTime = leadTime;
  }
}

export default class DeliveryOffice {
  private supplier: Supplier;

  private orderDate: Date;

  constructor({ supplier }) {
    this.supplier = supplier;
  }

  placeOrder(date: Date): OrderID {
    this.orderDate = date;
    return -1;
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  dispatchDate(orderID: OrderID): Date {
    const orderDate = this.orderDate.clone();
    const dispatchDate = orderDate.add(this.supplier.leadTime, 'days');
    while ([6, 0].includes(dispatchDate.day())) {
      dispatchDate.add(1, 'days');
    }
    return dispatchDate;
  }
}
