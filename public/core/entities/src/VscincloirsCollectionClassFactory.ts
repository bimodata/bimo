const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const VscincloirsCollectionClassFactory = ({ Vscincloir }) => {
  /* Serialization utilities dependencies */
  const childClasses = [Vscincloir];

  /** @extends {Collection<Vscincloir>} */
  class VscincloirsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'Vscincloir',
        ItemConstructor: Vscincloir,
        items: props.items,
        idPropName: `bimoId`,
        labelPropName: `vscincloirIntKey`,
        parent: props.parent,
      });
    }
  }

  /* Serialization utilities */
  VscincloirsCollection.allChildClasses = getAllChildClasses(childClasses);
  VscincloirsCollection.prototype.serializeModel = serializeThis;
  VscincloirsCollection.parseModel = parseThis;

  return VscincloirsCollection;
};

module.exports = VscincloirsCollectionClassFactory;
