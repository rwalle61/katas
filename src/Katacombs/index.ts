import readlineSync from 'readline-sync';
import Map from './Map';
import { Command, ItemName, Direction, Location } from './types';
import Bag from './Bag';
import Start from './locations/Start';

const titleText = 'LOST IN SHOREDITCH.\n';
const helpText = `${Command.Move} [direction], ${Command.Look} [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]`;

type GameConstructorArgs = {
  input?: Function;
  output?: Function;
  startingBag?: Bag;
  startingLocation?: Location;
  startingMap?: any;
};

export default class Game {
  private gameOver = false;

  private input;

  private output;

  private currentLocation: Location;

  private bag: Bag;

  private map;

  constructor({
    input = readlineSync.promptCL,
    output = console.log, // eslint-disable-line no-console
    startingBag = new Bag(),
    startingLocation = new Start(),
    startingMap = new Map(),
  }: GameConstructorArgs = {}) {
    this.input = input;
    this.output = output;
    this.currentLocation = startingLocation;
    this.bag = startingBag;
    this.map = startingMap;
  }

  private handleOpen() {
    const direction = this.currentLocation.doorDirection;
    this.currentLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    this.output(this.currentLocation.description);
  }

  private handleMove(direction: Direction) {
    this.currentLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    this.output(this.currentLocation.description);
    const amount = this.currentLocation.takeGold();
    if (amount) {
      this.bag.addGold(amount);
      this.output(`YOU FIND ${amount} GOLD!`);
    }
  }

  private handleLook(direction: Direction) {
    const nextLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    this.output(nextLocation.lookDescription);
  }

  private handleTake(itemName: ItemName) {
    const item = this.currentLocation.take(itemName);
    if (!item) {
      this.output(`NO ${itemName} HERE!`);
      return;
    }
    this.bag.add(item);
    this.output(`${itemName}: TAKEN`);
  }

  private handleDrop(itemName: ItemName) {
    const item = this.bag.find(itemName);
    if (!item) {
      this.output(Bag.getItemNotFoundText(itemName));
      return;
    }
    this.bag.remove(itemName);
    this.currentLocation.add(item);
    this.output(`${itemName}: DROPPED`);
  }

  private handleBag() {
    this.output(this.bag.toString());
  }

  private handleUse(itemName: ItemName) {
    const item = this.bag.find(itemName);
    if (!item) {
      this.output(Bag.getItemNotFoundText(itemName));
      return;
    }
    const useText = this.currentLocation.use(item);
    this.output(useText);
  }

  private handleHelp() {
    this.output(helpText);
  }

  private handleQuit() {
    this.gameOver = true;
    const quitText = 'bye';
    this.output(quitText);
  }

  private commandHandlers = {
    [Command.Open]: this.handleOpen,
    [Command.Move]: this.handleMove,
    [Command.Move]: this.handleMove,
    [Command.Look]: this.handleLook,
    [Command.Take]: this.handleTake,
    [Command.Drop]: this.handleDrop,
    [Command.Bag]: this.handleBag,
    [Command.Bag]: this.handleBag,
    [Command.Help]: this.handleHelp,
    [Command.Use]: this.handleUse,
    [Command.Quit]: this.handleQuit,
  };

  play() {
    this.output(titleText);
    this.output(this.currentLocation.description);
    while (!this.gameOver) {
      const [command, arg] = this.input();
      this.commandHandlers[command].call(this, arg);
    }
  }
}
