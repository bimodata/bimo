const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const VariantPointsCollectionClassFactory = ({ VariantPoint }) => {
  const childClasses = [VariantPoint];

  /** @extends {Collection<VariantPoint>} */
  class VariantPointsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'VariantPoint',
        ItemConstructor: VariantPoint,
        items: props.items,
        parent: props.parent,
        associationType: props.associationType,
      });
    }

    get mediumLoggingOutput() {
      return this.map((varPt) => `${varPt.varptPlace}${varPt.varptNoStopping === '1' ? '~' : '|'}`).join('');
    }

    get longLoggingOutput() {
      return this.map((varPt) => varPt.shortLoggingOutput).join('\n');
    }
  }

  /* Serialization utilities */
  VariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);
  VariantPointsCollection.prototype.serializeModel = serializeThis;
  VariantPointsCollection.parseModel = parseThis;

  return VariantPointsCollection;
};

module.exports = VariantPointsCollectionClassFactory;
