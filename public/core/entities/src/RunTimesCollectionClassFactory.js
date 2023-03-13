const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const RunTimesCollectionClassFactory = ({ RunTime }) => {
  const childClasses = [RunTime];

  /** @extends {Collection<RunTime>} */
  class RunTimesCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'RunTime',
        ItemConstructor: RunTime,
        idPropName: `bimoId`,
        labelPropName: `od`,
        ...props,
      });
    }
  }

  /* Serialization utilities */
  RunTimesCollection.allChildClasses = getAllChildClasses(childClasses);
  RunTimesCollection.prototype.serializeModel = serializeThis;
  RunTimesCollection.parseModel = parseThis;

  return RunTimesCollection;
};

module.exports = RunTimesCollectionClassFactory;
