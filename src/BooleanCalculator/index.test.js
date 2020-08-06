import toBoolean from '.';

describe('toBoolean(string)', () => {
  describe('single values', () => {
    test.each([
      ['TRUE', true],
      ['FALSE', false],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('NOT', () => {
    test.each([
      ['NOT TRUE', false],
      ['NOT FALSE', true],
      ['NOT NOT TRUE', true],
      ['NOT NOT NOT TRUE', false],
      ['NOT NOT NOT NOT NOT NOT TRUE', true],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('AND', () => {
    test.each([
      ['TRUE AND FALSE', false],
      ['TRUE AND TRUE', true],
      ['TRUE AND TRUE AND FALSE', false],
      ['FALSE AND TRUE', false],
      ['FALSE AND FALSE AND TRUE', true],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('OR', () => {
    test.each([
      ['TRUE OR FALSE', true],
      ['FALSE OR FALSE', false],
      ['FALSE OR TRUE', true],
      ['FALSE OR FALSE OR TRUE OR TRUE', true],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('NOT -> AND -> OR', () => {
    test.each([
      ['TRUE OR TRUE OR TRUE AND FALSE', true],
      ['TRUE OR FALSE AND NOT FALSE', true],
      ['NOT TRUE OR TRUE', true],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('Parentheses', () => {
    test.each([
      ['(TRUE)', true],
      ['(TRUE AND FALSE)', false],
      ['(TRUE OR TRUE OR TRUE) AND FALSE', false],
      ['NOT (TRUE AND TRUE)', false],
      ['NOT (TRUE AND FALSE)', true],
      ['((TRUE))', true],
      ['(TRUE) AND (FALSE)', false],
      ['(TRUE AND (TRUE AND TRUE))', true],
      ['(TRUE AND (TRUE AND FALSE))', false],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
  describe('Acceptance tests', () => {
    test.each([
      ['NOT ((TRUE OR TRUE) OR (TRUE AND FALSE))', false],
      ['TRUE OR TRUE OR NOT TRUE AND FALSE', true],
    ])('%s => %s', (input, expected) => {
      expect(toBoolean(input)).toEqual(expected);
    });
  });
});
