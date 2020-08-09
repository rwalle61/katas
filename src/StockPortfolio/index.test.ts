import dateFormat from 'dateformat';
import { StockName, ShareEvaluator, Operation } from './types';
import Portfolio from '.';

const newPurchase = (
  stockName: StockName,
  numShares: number,
  date: Date,
): Operation => ({
  stockName,
  numShares,
  date,
});

const newSale = (
  stockName: StockName,
  numShares: number,
  date: Date,
): Operation => ({
  stockName,
  numShares,
  date,
});

const mockShareEvaluator = (mockSharePrices): ShareEvaluator => (stockName) =>
  mockSharePrices[stockName];

const defaultMockShareEvaluator = () => 0;

const exampleDate = new Date(1990, 1, 14);

const formatDate = (date: Date) => dateFormat(date, 'dd/mm/yyyy');

describe('Portfolio', () => {
  describe('.buy()', () => {
    it.each([
      ['a stock', StockName.XP, 1, new Date(1990, 2, 14)],
      ['a different stock', StockName.Waterfall, 1, new Date(1990, 2, 14)],
      ['a different number of shares', StockName.XP, 2, new Date(1990, 2, 14)],
      ['on a different date', StockName.XP, 1, new Date(1990, 2, 15)],
    ])('buys %s', (_testName, stockName, numShares, purchaseDate) => {
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(stockName, numShares, purchaseDate));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
          `${stockName} | ${numShares} | $0.00 | $0.00 | bought ${numShares} on ${formatDate(
            purchaseDate,
          )}`,
        ].join('\n'),
      );
    });

    it.each([
      [1, 0, '0.00', '0.00'],
      [1, 1, '1.00', '1.00'],
      [1, 1.11, '1.11', '1.11'],
      [1, 1000, '1,000.00', '1,000.00'],
      [2, 1, '1.00', '2.00'],
    ])(
      'buys %i shares at price %s',
      (numShares, sharePrice, priceString, valueString) => {
        const stockName = StockName.XP;
        const portfolio = new Portfolio(
          mockShareEvaluator({ [stockName]: sharePrice }),
        );
        portfolio.buy(newPurchase(stockName, numShares, exampleDate));

        expect(portfolio.print()).toEqual(
          [
            'company | shares | current price | current value | last operation',
            `${stockName} | ${numShares} | $${priceString} | $${valueString} | bought ${numShares} on ${formatDate(
              exampleDate,
            )}`,
          ].join('\n'),
        );
      },
    );

    it('buys stock multiple times on same day', () => {
      const stockName = StockName.XP;
      const numShares = 1;
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(stockName, numShares, exampleDate));
      portfolio.buy(newPurchase(stockName, numShares, exampleDate));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
          `${stockName} | ${
            numShares * 2
          } | $0.00 | $0.00 | bought ${numShares} on ${formatDate(
            exampleDate,
          )}`,
        ].join('\n'),
      );
    });

    it('buys stock multiple times on different days', () => {
      const stockName = StockName.XP;
      const numShares = 1;
      const dateOf1stPurchase = new Date(1990, 2, 14);
      const dateOf2ndPurchase = new Date(1990, 2, 15);
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(stockName, numShares, dateOf1stPurchase));
      portfolio.buy(newPurchase(stockName, numShares, dateOf2ndPurchase));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
          `${stockName} | ${
            numShares * 2
          } | $0.00 | $0.00 | bought ${numShares} on ${formatDate(
            dateOf2ndPurchase,
          )}`,
        ].join('\n'),
      );
    });
  });

  describe('.sell()', () => {
    it("sells the portoflio's only stock", () => {
      const stockName = StockName.XP;
      const numShares = 1;
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(stockName, numShares, exampleDate));
      portfolio.sell(newSale(stockName, numShares, exampleDate));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
        ].join('\n'),
      );
    });

    it("sells some the the portoflio's only stock", () => {
      const stockName = StockName.XP;
      const numShares = 1;
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(stockName, numShares * 2, exampleDate));
      portfolio.sell(newSale(stockName, numShares, exampleDate));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
          `${stockName} | ${numShares} | $0.00 | $0.00 | sold ${numShares} on ${formatDate(
            exampleDate,
          )}`,
        ].join('\n'),
      );
    });
  });

  describe('.print()', () => {
    it('prints an empty portfolio', () => {
      const portfolio = new Portfolio(defaultMockShareEvaluator);

      expect(portfolio.print()).toEqual(
        'company | shares | current price | current value | last operation',
      );
    });

    it('prints different stocks bought on different days, in order of initial purchase', () => {
      const nameOfStockA = StockName.XP;
      const nameOfStockB = StockName.Waterfall;
      const numShares = 1;
      const earlierPurchaseDate = new Date(1990, 2, 14);
      const laterPurchaseDate = new Date(1990, 2, 15);
      const portfolio = new Portfolio(defaultMockShareEvaluator);
      portfolio.buy(newPurchase(nameOfStockA, numShares, laterPurchaseDate));
      portfolio.buy(newPurchase(nameOfStockB, numShares, earlierPurchaseDate));

      expect(portfolio.print()).toEqual(
        [
          'company | shares | current price | current value | last operation',
          `${nameOfStockB} | ${numShares} | $0.00 | $0.00 | bought ${numShares} on ${formatDate(
            earlierPurchaseDate,
          )}`,
          `${nameOfStockA} | ${numShares} | $0.00 | $0.00 | bought ${numShares} on ${formatDate(
            laterPurchaseDate,
          )}`,
        ].join('\n'),
      );
    });

    describe('Acceptance tests', () => {
      it('prints the correct portfolio', () => {
        const mockSharePrices = {
          [StockName.Waterfall]: 5.75,
          [StockName.Crafter]: 17.25,
          [StockName.XP]: 25.55,
        };
        const portfolio = new Portfolio(mockShareEvaluator(mockSharePrices));
        portfolio.buy(
          newPurchase(StockName.Waterfall, 1000, new Date(1990, 1, 14)),
        );
        portfolio.buy(
          newPurchase(StockName.Crafter, 400, new Date(2016, 5, 9)),
        );
        portfolio.buy(newPurchase(StockName.XP, 700, new Date(2018, 11, 10)));
        portfolio.sell(
          newSale(StockName.Waterfall, 500, new Date(2018, 11, 11)),
        );

        expect(portfolio.print()).toEqual(
          [
            'company | shares | current price | current value | last operation',
            'Old School Waterfall Software LTD | 500 | $5.75 | $2,875.00 | sold 500 on 11/12/2018',
            'Crafter Masters Limited | 400 | $17.25 | $6,900.00 | bought 400 on 09/06/2016',
            'XP Practitioners Incorporated | 700 | $25.55 | $17,885.00 | bought 700 on 10/12/2018',
          ].join('\n'),
        );
      });
    });
  });
});
