import { ExampleDay } from './testFixtures';
import DeliveryOffice, { Supplier } from '.';

describe('Estimate dispatch date', () => {
  // Narrative:
  // As a customer
  // I want to estimate the dispatch date of my order
  // So that I know when I will receive it

  test('Scenario 1: Place order on weekday, dispatch same week', () => {
    // Given the supplier has a lead time of 1 day
    const supplier = new Supplier({ leadTime: 1 });
    const deliveryOffice = new DeliveryOffice({ supplier });

    // When I place an order on Monday
    const orderID = deliveryOffice.placeOrder(ExampleDay.Monday);

    // Then the dispatch day is Tuesday
    expect(
      deliveryOffice.dispatchDate(orderID).isSame(ExampleDay.Tuesday),
    ).toBe(true);
  });

  test('Scenario 2: Place order on weekday, dispatch same week (using supplier with different lead time)', () => {
    // Given the supplier has a lead time of 2 days
    const supplier = new Supplier({ leadTime: 2 });
    const deliveryOffice = new DeliveryOffice({ supplier });

    // When I place an order on Monday
    const orderID = deliveryOffice.placeOrder(ExampleDay.Monday);

    // Then the dispatch day is Wednesday
    expect(
      deliveryOffice.dispatchDate(orderID).isSame(ExampleDay.Wednesday),
    ).toBe(true);
  });

  test('Scenario 3: Place order on weekday, dispatch after the weekend', () => {
    // Given the supplier has a lead time of 1 day
    const supplier = new Supplier({ leadTime: 1 });
    const deliveryOffice = new DeliveryOffice({ supplier });

    // When I place an order on Friday
    const orderID = deliveryOffice.placeOrder(ExampleDay.Friday);

    // Then the dispatch day is next Monday
    expect(
      deliveryOffice.dispatchDate(orderID).isSame(ExampleDay.NextMonday),
    ).toBe(true);
  });
});
