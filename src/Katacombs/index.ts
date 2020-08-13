import readlineSync from 'readline-sync';
import { getLocation, getNextLocation } from './map';
import { Command, LocationName } from './types';

const titleText = 'LOST IN SHOREDITCH.';
const helpText = `${Command.Move} [direction], ${Command.Look} [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]`;

export default class Game {
  private input;

  private output;

  private currentLocation;

  constructor(
    input = readlineSync.promptCL,
    output = console.log, // eslint-disable-line no-console
    nameOfStartingLocation = LocationName.Start,
  ) {
    this.input = input;
    this.output = output;
    this.currentLocation = getLocation(nameOfStartingLocation);
  }

  play() {
    let gameOver = false;
    this.output(titleText);
    this.output('');
    this.output(this.currentLocation.description);
    while (!gameOver) {
      const [command, arg] = this.input();
      if (command === Command.Move) {
        const direction = arg;
        this.currentLocation = getNextLocation(
          this.currentLocation.name,
          direction,
        );
        this.output(this.currentLocation.description);
      }
      if (command === Command.Look) {
        const direction = arg;
        const nextLocation = getNextLocation(
          this.currentLocation.name,
          direction,
        );
        this.output(nextLocation.lookDescription);
      }
      if (command === Command.Help) {
        this.output(helpText);
      }
      if (command === Command.Quit) {
        gameOver = true;
        const quitText = 'bye';
        this.output(quitText);
      }
    }
  }
}
