export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const SELL_BY_DATE = 0;

const keepQualityInValidRange = (quality) => {
  if (quality > MAX_QUALITY) {
    return MAX_QUALITY;
  }
  if (quality < MIN_QUALITY) {
    return MIN_QUALITY;
  }
  return quality;
};

const decrementSellIn = (sellIn) => sellIn - 1;

const updateBackstagePassesQuality = (sellIn, quality) => {
  let newQuality = quality;
  if (sellIn > 10) {
    newQuality += 1;
  } else if (sellIn <= 10 && sellIn > 5) {
    newQuality += 2;
  } else if (sellIn <= 5 && sellIn > SELL_BY_DATE) {
    newQuality += 3;
  } else {
    newQuality = MIN_QUALITY;
  }
  newQuality = keepQualityInValidRange(newQuality);
  return newQuality;
};

const updateBackstagePasses = (item) =>
  new Item(
    item.name,
    decrementSellIn(item.sellIn),
    updateBackstagePassesQuality(item.sellIn, item.quality),
  );

const updateAgedBrieQuality = (sellIn, quality) => {
  let newQuality = quality;
  if (sellIn > SELL_BY_DATE) {
    newQuality += 1;
  } else {
    newQuality += 2;
  }
  newQuality = keepQualityInValidRange(newQuality);
  return newQuality;
};

const updateAgedBrie = (item) =>
  new Item(
    item.name,
    decrementSellIn(item.sellIn),
    updateAgedBrieQuality(item.sellIn, item.quality),
  );

const updateConjuredItemQuality = (sellIn, quality) => {
  let newQuality = quality;
  if (sellIn > SELL_BY_DATE) {
    newQuality -= 2;
  } else {
    newQuality -= 4;
  }
  newQuality = keepQualityInValidRange(newQuality);
  return newQuality;
};

const updateConjuredItem = (item) =>
  new Item(
    item.name,
    decrementSellIn(item.sellIn),
    updateConjuredItemQuality(item.sellIn, item.quality),
  );

const updateGenericItemQuality = (sellIn, quality) => {
  let newQuality = quality;
  if (sellIn > SELL_BY_DATE) {
    newQuality -= 1;
  } else {
    newQuality -= 2;
  }
  newQuality = keepQualityInValidRange(newQuality);
  return newQuality;
};

const updateGenericItem = (item) =>
  new Item(
    item.name,
    decrementSellIn(item.sellIn),
    updateGenericItemQuality(item.sellIn, item.quality),
  );

const updateItem = (item) => {
  if (item.name === 'Sulfuras, Hand of Ragnaros') {
    return item;
  }
  if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
    return updateBackstagePasses(item);
  }
  if (item.name === 'Aged Brie') {
    return updateAgedBrie(item);
  }
  if (item.name.startsWith('Conjured ')) {
    return updateConjuredItem(item);
  }
  return updateGenericItem(item);
};

const updateItems = (items) => items.map(updateItem);

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = updateItems(this.items);
    return this.items;
  }
}
