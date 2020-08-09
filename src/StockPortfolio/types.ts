export enum StockName {
  Waterfall = 'Old School Waterfall Software LTD',
  Crafter = 'Crafter Masters Limited',
  XP = 'XP Practitioners Incorporated',
}

export type ShareEvaluator = (stockName: StockName) => number;

export type Operation = {
  stockName: StockName;
  numShares: number;
  date: Date;
};

export enum OperationType {
  Sale,
  Purchase,
}

export type CompanyShares = {
  stockName: StockName;
  numShares: number;
  firstOperationDate: Date;
  lastOperation: {
    type: OperationType;
    numShares: number;
    date: Date;
  };
};
