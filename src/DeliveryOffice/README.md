# The Messy Delivery Office Requirements

Transform the following unstructured requirements into a BDD-style specification. Ideally, it should be done using acceptance criteria in a Given/When/Then structure and within an automation suite in order to be part of a continuous automation environment. If you feel like it, you can even carry on and implement them, using Outside-In TDD!

### Estimated dispatch date service:

Create a service with a `DispatchDate` method which, given the ID of a customer order collected via our website, returns its estimated dispatch date.

An order consists of an order date and a collection of products that a customer has added to their shopping basket. Each of these products is supplied to our company Just In Time through a number of third-party suppliers. As soon as an order is received by a supplier, the supplier will start processing the order.

The supplier has an agreed lead time in which to process the order before delivering it to the company's Delivery Office. Once the Delivery Office has received all products in an order, it is dispatched to the customer. Suppliers start processing an order on the same day that the order is received. For example, a supplier with a lead time of one day, receiving an order today before midnight,
will send it to the Delivery Office tomorrow. Once all products for an order have arrived at the Delivery Office from the suppliers, they usually will be dispatched to the customer on the same day.

The exception is caused by the fact that the Delivery Office doesn't work over the weekend. Packages received from a supplier on a weekend will be dispatched the following Monday. Furthermore, none of the suppliers work during the weekend, so if an order is received on Friday with a lead time of 2 days, the Delivery Office would receive and dispatch on Tuesday.
