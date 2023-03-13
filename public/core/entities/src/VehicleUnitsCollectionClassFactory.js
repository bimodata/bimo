const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const VehicleUnitsCollectionClassFactory = ({ VehicleUnit }) => {
  /* Serialization utilities dependencies */
  const childClasses = [VehicleUnit];

  /** @extends {Collection<VehicleUnit>} */
  class VehicleUnitsCollection extends Collection {
    constructor(props = {}) {
      Object.assign(props, {
        itemName: 'VehicleUnit',
        ItemConstructor: VehicleUnit,
        idPropName: `vehuInternalNumber`,
        labelPropName: `vehuIdentifierUser`,
      });
      super(props);
    }
  }

  /* Serialization utilities */
  VehicleUnitsCollection.allChildClasses = getAllChildClasses(childClasses);
  VehicleUnitsCollection.prototype.serializeModel = serializeThis;
  VehicleUnitsCollection.parseModel = parseThis;

  return VehicleUnitsCollection;
};

module.exports = VehicleUnitsCollectionClassFactory;
