export interface Source {
  GetChar(): string;
}

export interface Destination {
  SetChar(character: string): void;
}

export interface Copier {
  Copy(): void
}
