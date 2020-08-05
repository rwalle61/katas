import { TaskDispatcher, Instrument } from './types';
import InstrumentProcessor from '.';

/* eslint-disable class-methods-use-this, lines-between-class-members */
class MockTaskDispatcher implements TaskDispatcher {
  GetTask() {
    return '';
  }
  FinishedTask() {}
}

class MockInstrument implements Instrument {
  Execute() {}
  Finished() {}
  Error() {}
}

class ArgumentNullException extends Error {}

const mockTask = 'mockTask';

describe('InstrumentProcessor', () => {
  describe('.Process()', () => {
    it('gets the next task from the task dispatcher and executes it on the instrument', () => {
      const dispatcher = new MockTaskDispatcher();
      dispatcher.GetTask = jest.fn().mockReturnValueOnce(mockTask);

      const instrument = new MockInstrument();
      const spyOnExecute = jest.spyOn(instrument, 'Execute');
      const processor = new InstrumentProcessor(dispatcher, instrument);

      processor.Process();

      expect(spyOnExecute).toHaveBeenCalledWith(mockTask);
    });
    it('passes exceptions thrown from Instrument.Execute() on to the caller of .Process()', () => {
      const dispatcher = new MockTaskDispatcher();
      const instrument = new MockInstrument();
      instrument.Execute = jest.fn().mockImplementationOnce(() => {
        throw new ArgumentNullException();
      });
      const processor = new InstrumentProcessor(dispatcher, instrument);

      expect(() => processor.Process()).toThrowError(ArgumentNullException);
    });
  });
  describe('when the instrument fires the Finished event', () => {
    it("calls the task dispatcher's FinishedTask method with the correct task", () => {
      const dispatcher = new MockTaskDispatcher();
      dispatcher.GetTask = jest.fn().mockReturnValueOnce(mockTask);
      const spyOnFinishedTask = jest.spyOn(dispatcher, 'FinishedTask');
      const instrument = new MockInstrument();
      const processor = new InstrumentProcessor(dispatcher, instrument);

      processor.Process();
      instrument.Finished();

      expect(spyOnFinishedTask).toHaveBeenCalledWith(mockTask);
    });
  });
  describe('when the instrument fires the Error event', () => {
    it('write the "Error occurred" string to the console', () => {
      const dispatcher = new MockTaskDispatcher();
      const spyOnConsoleError = jest.spyOn(console, 'error');
      spyOnConsoleError.mockImplementation(() => {});
      const instrument = new MockInstrument();
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const processor = new InstrumentProcessor(dispatcher, instrument);

      instrument.Error();

      expect(spyOnConsoleError).toHaveBeenCalledWith('Error occurred');
    });
  });
});
