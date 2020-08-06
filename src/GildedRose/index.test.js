import { Shop, Item } from '.';

describe('Shop', () => {
  describe('.updateQuality', () => {
    it('should foo', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('fixme');
    });
    // test.each([
    //   ['not divisible by 4', 1, false],
    // ])('%s: %i => %s', (_testName, year, expectedBoolean) => {
    //   expect(isLeapYear(year)).toEqual(expectedBoolean);
    // });
  });
});
