import {
  InstrumentProcessor as IInstrumentProcessor,
  TaskDispatcher,
  Instrument,
} from './types';

const onError = () => {
  // eslint-disable-next-line no-console
  console.error('Error occurred');
};

export default class InstrumentProcessor implements IInstrumentProcessor {
  private dispatcher: TaskDispatcher;

  private instrument: Instrument;

  private currentTask: string;

  constructor(dispatcher: TaskDispatcher, instrument: Instrument) {
    this.dispatcher = dispatcher;
    this.instrument = instrument;
    this.instrument.Finished = this.onFinished.bind(this);
    this.instrument.Error = onError;
  }

  Process() {
    this.currentTask = this.dispatcher.GetTask();
    this.instrument.Execute(this.currentTask);
  }

  onFinished() {
    this.dispatcher.FinishedTask(this.currentTask);
  }
}
