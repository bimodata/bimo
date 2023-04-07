/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const TrainPathVariantsCollectionClassFactory = ({ TrainPathVariant }) => {
  const childClasses = [TrainPathVariant];

  /** @extends {Collection<TrainPathVariant>} */
  class TrainPathVariantsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'TrainPathVariant',
        ItemConstructor: TrainPathVariant,
        associationType: 'composition',
        ...props,
      });
    }

    get self() {
      return this;
    }
  }

  TrainPathVariantsCollection.allChildClasses = getAllChildClasses(childClasses);
  TrainPathVariantsCollection.prototype.serializeModel = serializeThis;
  TrainPathVariantsCollection.parseModel = parseThis;

  return TrainPathVariantsCollection;
};

module.exports = TrainPathVariantsCollectionClassFactory;
