# Character Copier by Urs Enzler

We found these katas on Urs Enzler's website: https://www.planetgeek.ch.

The character copier is a simple class that reads characters from a source and copies them to a destination one character at a time.

When the Copy method is called on the copier, then it should read characters from the source and copy them to the destination until the source returns a newline (`\n`).

The exercise is to implement the character copier using Test Doubles for the source and the destination (try using Spies – manually written Mocks – and Mocks written with a mocking framework).

Start from these definitions:

```ts
public class Copier
{
  public Copier(ISource source, IDestination destination) {...}
  public void Copy() {}
}

public interface ISource
{
  char GetChar();
}

public interface IDestination
{
  void SetChar(char character);
}
```
