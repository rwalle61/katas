export interface InstrumentProcessor {
  Process(): void;
}

export interface TaskDispatcher {
  GetTask(): string;
  FinishedTask(task: string): void;
}

export interface Instrument {
  Execute(task: string): void;
  Finished(): void;
  Error(): void;
}
