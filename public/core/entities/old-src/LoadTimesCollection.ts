const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Linked Classes */
const LoadTime = require('./LoadTime');

const childClasses = [LoadTime];

/* Class definition */
/** @extends {Collection<LoadTime>} */
class LoadTimesCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'LoadTime',
      ItemConstructor: LoadTime,
      idPropName: 'bimoId',
      labelPropName: 'ltPlaceId',
      ...props,
    });
  }
}

/* Serialization utilities */
LoadTimesCollection.allChildClasses = getAllChildClasses(childClasses);
LoadTimesCollection.prototype.serializeModel = serializeThis;
LoadTimesCollection.parseModel = parseThis;

module.exports = LoadTimesCollection;
