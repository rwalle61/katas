import dateFormat from 'dateformat';
import cloneDeep from 'lodash.clonedeep';
import { ShareEvaluator, OperationType, CompanyShares } from './types';

const sortByFirstOperationDate = (shares: CompanyShares[]): CompanyShares[] => {
  const sharesClone = cloneDeep(shares);
  sharesClone.sort((a, b) => a.firstOperationDate - b.firstOperationDate);
  return sharesClone;
};

const insertCommas = (number: string) =>
  number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const toPriceString = (price: number) => insertCommas(price.toFixed(2));

const formatDate = (date: Date) => dateFormat(date, 'dd/mm/yyyy');

const operationTypeToString = {
  [OperationType.Purchase]: 'bought',
  [OperationType.Sale]: 'sold',
};

const printCompanyShares = (
  shares: CompanyShares,
  shareEvaluator: ShareEvaluator,
) => {
  const { stockName, numShares, lastOperation } = shares;
  const price = shareEvaluator(stockName);
  const stockValue = price * numShares;
  const operationString = operationTypeToString[lastOperation.type];
  return `${stockName} | ${numShares} | $${toPriceString(
    price,
  )} | $${toPriceString(stockValue)} | ${operationString} ${
    lastOperation.numShares
  } on ${formatDate(lastOperation.date)}`;
};

export const printPortfolio = (
  shares: CompanyShares[],
  shareEvaluator: ShareEvaluator,
) => {
  const header =
    'company | shares | current price | current value | last operation';
  const sortedShares = sortByFirstOperationDate(shares);
  const rowsOfShares = sortedShares.map((companyShares) =>
    printCompanyShares(companyShares, shareEvaluator),
  );
  return [header, ...rowsOfShares].join('\n');
};
