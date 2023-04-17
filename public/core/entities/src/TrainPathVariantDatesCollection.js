/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const TrainPathVariantDate = require('./TrainPathVariantDate');

const childClasses = [TrainPathVariantDate];

/** @extends {Collection<TrainPathVariantDate>} */
class TrainPathVariantDatesCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'TrainPathVariantDate',
      ItemConstructor: TrainPathVariantDate,
      associationType: 'aggregation',
      ...props,
    });
  }

  get self() {
    return this;
  }
}

TrainPathVariantDatesCollection.allChildClasses = getAllChildClasses(childClasses);
TrainPathVariantDatesCollection.prototype.serializeModel = serializeThis;
TrainPathVariantDatesCollection.parseModel = parseThis;

module.exports = TrainPathVariantDatesCollection;
