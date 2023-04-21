/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const TrainPathVariantPoint = require('./TrainPathVariantPoint');

const childClasses = [TrainPathVariantPoint];

/** @extends {Collection<TrainPathVariantPoint>} */
class TrainPathVariantPointsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'TrainPathVariantPoint',
      ItemConstructor: TrainPathVariantPoint,
      associationType: 'aggregation',
      ...props,
    });
  }

  get self() {
    return this;
  }
}

TrainPathVariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);
TrainPathVariantPointsCollection.prototype.serializeModel = serializeThis;
TrainPathVariantPointsCollection.parseModel = parseThis;

module.exports = TrainPathVariantPointsCollection;
