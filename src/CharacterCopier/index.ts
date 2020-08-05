import { Source, Destination, Copier as ICopier } from './types';

const isValidCharacter = (char) => ![undefined, '\n'].includes(char);

export default class Copier implements ICopier {
  private source: Source;

  private destination: Destination;

  constructor(source: Source, destination: Destination) {
    this.source = source;
    this.destination = destination;
  }

  Copy() {
    const getChar = this.source.GetChar;
    let char = getChar();
    while (isValidCharacter(char)) {
      this.destination.SetChar(char);
      char = getChar();
    }
  }
}
