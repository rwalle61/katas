# Katacombs of Shoreditch by Marco Consolaro

Inspired by [Colossal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure), this is a kata for building a text-based adventure game that can be expanded incrementally and indefinitely, and is limited only by your imagination.

The game is based on a console application that describes a fictional underground world to be explored by the player via a set of commands.

The world is a collection of locations linked to each other geographically (in terms of North, South, East or West) or via specific connection points (doors, passages, gates, stairs, and so on). The player can move among the locations using cardinal points for directions, or exploiting the connection points with actions or items.

Other important aspects:

- It is possible to simply look in every direction, but not all the directions are always available for being looked at, nor to move to.
- The world will have treasures hidden in several locations, which can be revealed if players enter the location or uses the correct item in the correct location.
- The game terminates when the player finds the exit of the katacombs, and the score is the sum of the value of the treasures collected.
- When looking somewhere without anything interesting, the system should reply, `Nothing interesting to look at there!`
- When a general action is not available, the system will reply, `I can't do that here!`
- When the system can't understand the command, it should prompt, `I don't understand that. English please!`

Interesting challenges still to do:

- refactor: follow the Law of Demeter strictly
- test: add unit tests, but follow ATDD
- feat: allow Items to be incremented in quantity, rather than each being treated as new
- feat: allow Items to be Opened
- feat: allow Items to be used differently in different places
- feat: limit the Bag to 10 Items
- feat: allow certain Items to disappear on use
