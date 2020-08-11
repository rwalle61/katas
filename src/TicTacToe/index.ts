import readlineSync from 'readline-sync';
import { Player, GameState, PlayersMoves } from './types';
import { getGameState, getCurrentPlayer } from './utils/game.utils';
import {
  renderWelcome,
  renderQuestion,
  renderBoard,
  renderResult,
} from './utils/render.utils';

export const getNextMove = (input, existingMoves: PlayersMoves) => {
  const question = renderQuestion(existingMoves);
  const answer = input(question);
  return parseInt(answer, 10);
};

export default class Game {
  private input;

  private output;

  private playersMoves: PlayersMoves = {
    [Player.X]: [],
    [Player.O]: [],
  };

  constructor(input = readlineSync.question, output = console.log) {
    this.input = input;
    this.output = output;
  }

  move(position: number) {
    this.playersMoves[this.getCurrentPlayer()].push(position);
  }

  play() {
    this.printWelcome();
    while (this.isIncomplete()) {
      this.printBoard();
      const position = this.getNextMove();
      this.move(position);
    }
    this.printBoard();
    this.printResult();
  }

  private getCurrentPlayer() {
    return getCurrentPlayer(this.playersMoves);
  }

  private getGameState() {
    return getGameState(this.playersMoves);
  }

  private getNextMove() {
    return getNextMove(this.input, this.playersMoves);
  }

  private isIncomplete() {
    return this.getGameState() === GameState.Incomplete;
  }

  private printWelcome() {
    this.output(renderWelcome(this.getCurrentPlayer()));
  }

  private printBoard() {
    this.output(renderBoard(this.playersMoves));
  }

  private printResult() {
    this.output(renderResult(this.getGameState()));
  }
}
