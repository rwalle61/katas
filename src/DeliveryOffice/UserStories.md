# Estimate dispatch date

## Narrative:

As a customer

I want to estimate the dispatch date of my order

So that I know when I will receive it

## Acceptance Criteria:

### Scenario 1: Place order on weekday, dispatch same week

Given the supplier has a lead time of 1 day

When I place an order on Monday

Then the dispatch day is Tuesday

### Scenario 2: Place order on weekday, dispatch same week (using supplier with different lead time)

Given the supplier has a lead time of 2 days

When I place an order on Monday

Then the dispatch day is Wednesday

### Scenario 3: Place order on weekday, dispatch after the weekend

Given the supplier has a lead time of 1 day

When I place an order on Friday

Then the dispatch day is next Monday
