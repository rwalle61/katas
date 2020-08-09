import {
  Operation,
  ShareEvaluator,
  StockName,
  OperationType,
  CompanyShares,
} from './types';
import { printPortfolio } from './printer';

const newCompanyShares = (
  stockName,
  numShares,
  purchaseDate: Date,
): CompanyShares => ({
  stockName,
  numShares,
  firstOperationDate: purchaseDate,
  lastOperation: {
    type: OperationType.Purchase,
    numShares,
    date: purchaseDate,
  },
});

export default class Portfolio {
  private shares: CompanyShares[];

  private shareEvaluator: ShareEvaluator;

  constructor(shareEvaluator: ShareEvaluator) {
    this.shareEvaluator = shareEvaluator;
    this.resetPortfolio();
  }

  private resetPortfolio() {
    this.shares = [];
  }

  private findShares(stockName: StockName) {
    return this.shares.find((shares) => shares.stockName === stockName);
  }

  private addToPortfolio(shares: CompanyShares) {
    this.shares = this.shares.concat([shares]);
  }

  private removeFromPortfolio(stockName: StockName) {
    this.shares = this.shares.filter(
      (shares) => shares.stockName !== stockName,
    );
  }

  buy({ stockName, numShares, date }: Operation): void {
    const existingCompanyShares = this.findShares(stockName);
    if (!existingCompanyShares) {
      this.addToPortfolio(newCompanyShares(stockName, numShares, date));
      return;
    }
    existingCompanyShares.numShares += numShares;
    existingCompanyShares.lastOperation.numShares = numShares;
    existingCompanyShares.lastOperation.date = date;
  }

  sell({ stockName, numShares, date }: Operation) {
    const existingCompanyShares = this.findShares(stockName);
    if (existingCompanyShares.numShares <= numShares) {
      this.removeFromPortfolio(stockName);
      return;
    }
    existingCompanyShares.numShares -= numShares;
    existingCompanyShares.lastOperation.type = OperationType.Sale;
    existingCompanyShares.lastOperation.numShares = numShares;
    existingCompanyShares.lastOperation.date = date;
  }

  print(): string {
    return printPortfolio(this.shares, this.shareEvaluator);
  }
}
