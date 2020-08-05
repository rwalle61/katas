# Instrument Processor by Urs Enzler

In the Instrument Processor kata, we are going to implement a class that gets tasks from a `TaskDispatcher` and executes them on an `Instrument`.

The `InstrumentProcessor` must implement the following interface:

```java
public interface IInstrumentProcessor
{
  void Process();
}
```

The task dispatcher must have the following interface:

```java
public interface ITaskDispatcher
{
  string GetTask();
  void FinishedTask(string task);
}
```

The `GetTask` method returns the next task to execute on the instrument.

After the task has been successfully executed on the instrument, the `FinishedTask` method must be called by the `InstrumentProcessor`, passing the task that was completed as the method argument.

The `InstrumentProcessor` has the following interface:

```java
public interface IInstrument
{
  void Execute(string task);
  event EventHandler Finished;
  event EventHandler Error;
}
```

The `Execute` method starts the instrument, which will begin to execute the task passed to it. The method will return immediately (we assume that the instrument implementation is asynchronous).

The `Execute` method will throw `ArgumentNullException` if the task passed in is null.

When the instrument finishes executing, then the `Finished` event is fired.

When the instrument detects an error situation during execution (note that the `Execute` method will already have returned the control flow to the caller due to its asynchronous implementation), it fires the `Error` event.

The exercise is to implement the `InstrumentProcessor` in a way that:

- When the method `Process` is called, the `InstrumentProcessor` gets the next task from the task dispatcher and executes it on the instrument
- When the `Execute` method of the instrument throws an exception, that exception is passed on to the caller of the `Process` method
- When the instrument fires the `Finished` event, the `InstrumentProcessor` calls the task dispatcher's `FinishedTask` method with the correct task
- When the instrument fires the `Error` event, then the `InstrumentProcessor` writes the `Error` occurred string to the console
