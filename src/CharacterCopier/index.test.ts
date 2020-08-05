import { Source, Destination } from './types';
import Copier from '.';

type Values = [...any[]];

const mockReturnValueOnce = (func: jest.Mock, value) =>
  func.mockReturnValueOnce(value);

const mockReturnValues = (func: jest.Mock, [firstValue, ...rest]: Values) =>
  firstValue
    ? mockReturnValues(mockReturnValueOnce(func, firstValue), rest)
    : func;

class MockSource implements Source {
  // eslint-disable-next-line
  GetChar() {
    return '';
  }
}

class MockDestination implements Destination {
  SetChar() {} // eslint-disable-line
}

describe('Copier', () => {
  describe('.Copy()', () => {
    test.each([
      ['char', 'a', [['a']]],
      ['string', 'ab', [['a'], ['b']]],
      ['empty string', '', []],
      ['string up to first newline', 'a\nb', [['a']]],
    ])('copies %s', (_testname, input, expected) => {
      const source = new MockSource();
      source.GetChar = mockReturnValues(jest.fn(), input.split(''));
      const destination = new MockDestination();
      const spyOnSetChar = jest.spyOn(destination, 'SetChar');
      const copier = new Copier(source, destination);

      copier.Copy();

      expect(spyOnSetChar.mock.calls).toEqual(expected);
    });
  });
});
