# Elevator Kata by Marco Consolaro

Implement a controller for an elevator system considering the following requirements.

For evaluation purposes, assume that it takes one second to move the elevator from one floor to another and the doors stay open for three seconds at every stop.

The building has a total of five floors, including the basement and the ground floor. The elevator can be called at any floor only when it is not in use via one call button.

Given the elevator is positioned on the ground floor:

1. When there is a call from floor 3 to go to the basement
2. And there is a call from the ground floor to go to the basement
3. And there is a call from floor 2 to go to the basement
4. And there is a call from floor 1 to go to floor 3
5. Then the doors should open at floor 3, basement, ground, basement, floor 2, basement, floor 1, and floor 3 in this order
