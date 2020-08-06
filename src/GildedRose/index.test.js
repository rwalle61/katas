import { Shop, Item } from '.';

const nameOfGenericItem = 'nameOfGenericItem';
const dayBeforeSellByDate = 1;
const dayAfterSellByDate = 0;
const exampleSellIn = 5;
const exampleQuality = 5;

describe('Shop.updateQuality()', () => {
  describe('empty shop', () => {
    it('returns no items', () => {
      const gildedRose = new Shop();

      expect(gildedRose.updateQuality()).toEqual([]);
    });
  });
  describe('all items', () => {
    it('does not change the item name', () => {
      const gildedRose = new Shop([
        new Item(nameOfGenericItem, exampleSellIn, exampleQuality),
      ]);

      const [item] = gildedRose.updateQuality();

      expect(item.name).toBe(nameOfGenericItem);
    });
    it('saves updates to the items each day', () => {
      const gildedRose = new Shop([
        new Item(nameOfGenericItem, exampleSellIn, exampleQuality),
      ]);

      gildedRose.updateQuality();
      const [item] = gildedRose.updateQuality();
      expect(item.sellIn).toBe(exampleSellIn - 2);
    });
  });
  describe('generic items', () => {
    it.each([[1], [0], [-1]])(
      'decreases the SellIn value by 1 day: %s',
      (initialSellIn) => {
        const gildedRose = new Shop([
          new Item(nameOfGenericItem, initialSellIn, exampleQuality),
        ]);

        const [item] = gildedRose.updateQuality();

        expect(item.sellIn).toBe(initialSellIn - 1);
      },
    );
    it.each([
      ['by 1 before sell-by date', dayBeforeSellByDate, 2, 1],
      ['by 2 after sell-by date', dayAfterSellByDate, 3, 1],
      ['no lower than 0 before sell-by date', dayBeforeSellByDate, 0, 0],
      ['no lower than 0 after sell-by date', dayAfterSellByDate, 1, 0],
      ['no lower than 0 after sell-by date', dayAfterSellByDate, 0, 0],
    ])(
      'decreases Quality %s',
      (_testName, initialSellIn, initialQuality, expectedQuality) => {
        const gildedRose = new Shop([
          new Item(nameOfGenericItem, initialSellIn, initialQuality),
        ]);

        const [item] = gildedRose.updateQuality();

        expect(item.quality).toBe(expectedQuality);
      },
    );
  });
  describe('special items', () => {
    describe('Aged Brie', () => {
      it.each([
        ['by 1 before sell-by date', dayBeforeSellByDate, 1, 2],
        ['by 2 after sell-by date', dayAfterSellByDate, 1, 3],
        ['no higher than 50 before sell-by date', dayBeforeSellByDate, 50, 50],
        ['no higher than 50 after sell-by date', dayAfterSellByDate, 49, 50],
        ['no higher than 50 after sell-by date', dayAfterSellByDate, 50, 50],
      ])(
        'increases Quality %s',
        (_testName, initialSellIn, initialQuality, expectedQuality) => {
          const gildedRose = new Shop([
            new Item('Aged Brie', initialSellIn, initialQuality),
          ]);

          const [item] = gildedRose.updateQuality();

          expect(item.quality).toBe(expectedQuality);
        },
      );
    });
    describe('Backstage passes', () => {
      const nameOfBackstagePasses = 'Backstage passes to a TAFKAL80ETC concert';
      it.each([
        ['by 1 when >10 days before sell-by date', 11, 1, 2],
        ['by 2 when =<10 and >5 days before sell-by date', 10, 1, 3],
        ['by 2 when =<10 and >5 days before sell-by date', 6, 1, 3],
        ['by 3 when =<5 days before sell-by date', 5, 1, 4],
        ['no higher than 50 when >10 days before sell-by date', 11, 50, 50],
        [
          'no higher than 50 when =<10 and >5 days before sell-by date',
          10,
          50,
          50,
        ],
        [
          'no higher than 50 when =<10 and >5 days before sell-by date',
          6,
          50,
          50,
        ],
        ['no higher than 50 when =<5 days before sell-by date', 5, 50, 50],
      ])(
        'increases Quality %s',
        (_testName, initialSellIn, initialQuality, expectedQuality) => {
          const gildedRose = new Shop([
            new Item(nameOfBackstagePasses, initialSellIn, initialQuality),
          ]);

          const [item] = gildedRose.updateQuality();

          expect(item.quality).toBe(expectedQuality);
        },
      );
      it('drops Quality to 0 after the concert', () => {
        const gildedRose = new Shop([
          new Item(nameOfBackstagePasses, dayAfterSellByDate, exampleQuality),
        ]);

        const [item] = gildedRose.updateQuality();

        expect(item.quality).toBe(0);
      });
    });
    describe('legendary items', () => {
      it('does not change the SellIn or Quality value', () => {
        const nameOfLegendaryItem = 'Sulfuras, Hand of Ragnaros';
        const sellInOfLegendaryItem = 'N/A';
        const qualityOfLegendaryItem = 80;
        const gildedRose = new Shop([
          new Item(
            nameOfLegendaryItem,
            sellInOfLegendaryItem,
            qualityOfLegendaryItem,
          ),
        ]);

        const [item] = gildedRose.updateQuality();

        expect(item.sellIn).toBe(sellInOfLegendaryItem);
        expect(item.quality).toBe(qualityOfLegendaryItem);
      });
    });
    describe.skip('conjured items', () => {
      describe.each([['Conjured Mana Cake'], ['Conjured Item']])(
        '%s',
        (nameOfConjuredItem) => {
          it.each([
            ['by 2 before sell-by date', dayBeforeSellByDate, 3, 1],
            ['by 4 after sell-by date', dayAfterSellByDate, 5, 1],
            ['no lower than 0 before sell-by date', dayBeforeSellByDate, 1, 0],
            ['no lower than 0 after sell-by date', dayAfterSellByDate, 1, 0],
            ['no lower than 0 after sell-by date', dayAfterSellByDate, 0, 0],
          ])(
            'decreases Quality %s',
            (_testName, initialSellIn, initialQuality, expectedQuality) => {
              const gildedRose = new Shop([
                new Item(nameOfConjuredItem, initialSellIn, initialQuality),
              ]);

              const [item] = gildedRose.updateQuality();

              expect(item.quality).toBe(expectedQuality);
            },
          );
        },
      );
    });
    describe('Acceptance tests', () => {
      it('updates all items correctly', () => {
        const expectedItems = [
          {
            name: '+5 Dexterity Vest',
            values: [
              [10, 20],
              [9, 19],
            ],
          },
          {
            name: 'Aged Brie',
            values: [
              [2, 0],
              [1, 1],
            ],
          },
          {
            name: 'Sulfuras, Hand of Ragnaros',
            values: [
              [0, 80],
              [0, 80],
            ],
          },
          {
            name: 'Sulfuras, Hand of Ragnaros',
            values: [
              [-1, 80],
              [-1, 80],
            ],
          },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            values: [
              [15, 20],
              [14, 21],
            ],
          },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            values: [
              [10, 49],
              [9, 50],
            ],
          },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            values: [
              [5, 49],
              [4, 50],
            ],
          },
          // {
          //   name: 'Conjured Mana Cake',
          //   values: [
          //     [3, 6],
          //     [2, 4],
          //   ],
          // },
        ];

        const items = expectedItems.map(
          ({ name, values: [[initialSellIn, initialQuality]] }) =>
            new Item(name, initialSellIn, initialQuality),
        );

        const gildedRose = new Shop(items);

        const updatedItems = gildedRose.updateQuality();

        expectedItems.forEach((expectedItem, i) => {
          const {
            name: expectedName,
            values: [, [expectedSellIn, expectedQuality]],
          } = expectedItem;
          const item = updatedItems[i];
          expect(item.name).toBe(expectedName);
          expect(item.sellIn).toBe(expectedSellIn);
          expect(item.quality).toBe(expectedQuality);
        });
      });
    });
  });
});
