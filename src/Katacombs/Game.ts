import readlineSync from 'readline-sync';
import { ObjectName, Command, ItemName, Direction, Location } from './types';
import Map from './Map';
import Bag from './Bag';

const titleText = 'LOST IN SHOREDITCH.\n';
const helpText = `${Command.Move} [direction], ${Command.Look} [direction/item], OPEN [item], TAKE [item], DROP [item], BAG, USE [item]`;

type GameConstructorArgs = {
  input?: Function;
  output?: Function;
  bag?: Bag;
  map?: Map;
};

export default class Game {
  private gameOver = false;

  private input: Function;

  private output: Function;

  private currentLocation: Location;

  private bag: Bag;

  private map: Map;

  constructor({
    input = readlineSync.promptCL,
    output = console.log,
    bag = new Bag(),
    map = new Map(),
  }: GameConstructorArgs = {}) {
    this.input = input;
    this.output = output;
    this.currentLocation = map.getStartingLocation();
    this.map = map;
    this.bag = bag;
  }

  private handleOpen(objectName: ObjectName) {
    const object = this.currentLocation.getOpenableObject(objectName);
    if (!object) {
      this.output(`NO ${objectName} TO OPEN!`);
      return;
    }
    const { direction } = object;
    this.currentLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    this.output(this.currentLocation.description);
  }

  private handleMove(direction: Direction) {
    if (!Object.values(Direction).includes(direction)) {
      this.output(`${direction}: UNKNOWN DIRECTION`);
      return;
    }
    const nextLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    if (!nextLocation) {
      this.output("CAN'T GET THERE!");
      return;
    }
    this.currentLocation = nextLocation;
    this.output(this.currentLocation.description);
    const amount = this.currentLocation.takeGold();
    if (amount) {
      this.bag.addGold(amount);
      this.output(`YOU FIND ${amount} GOLD!`);
    }
  }

  private handleLook(direction: Direction) {
    if (!Object.values(Direction).includes(direction)) {
      this.output(`${direction}: UNKNOWN DIRECTION`);
      return;
    }
    const nextLocation = this.map.getNextLocation(
      this.currentLocation,
      direction,
    );
    if (!nextLocation) {
      this.output('NOTHING TO SEE THERE!');
      return;
    }
    this.output(nextLocation.lookDescription);
  }

  private handleTake(itemName: ItemName) {
    const item = this.currentLocation.find(itemName);
    if (!item) {
      this.output(`NO ${itemName} HERE!`);
      return;
    }
    if (this.bag.isFull()) {
      this.output('THE BAG IS FULL!');
      return;
    }
    this.currentLocation.remove(itemName);
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
    item.use();
    if (item.hasDegraded()) {
      this.bag.remove(itemName);
    }
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

  private handleCommand(command, arg) {
    const handler =
      this.commandHandlers[command] || this.commandHandlers[Command.Help];
    handler.call(this, arg);
  }

  play() {
    this.output(titleText);
    this.output(this.currentLocation.description);
    while (!this.gameOver) {
      const [command, arg] = this.input();
      this.handleCommand(command, arg);
    }
  }
}
