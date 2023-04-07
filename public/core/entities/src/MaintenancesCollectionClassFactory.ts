const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const MaintenancesCollectionClassFactory = ({ Maintenance }) => {
  const childClasses = [Maintenance];

  /** @extends {Collection<Maintenance>} */
  class MaintenancesCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'Maintenance',
        ItemConstructor: Maintenance,
        idPropName: `bimoId`,
        businessIdPropName: `mtnInternalNumber`,
        labelPropName: `mtnVehicleActivityId`,
        ...props,
      });
    }
  }

  MaintenancesCollection.allChildClasses = getAllChildClasses(childClasses);
  MaintenancesCollection.prototype.serializeModel = serializeThis;
  MaintenancesCollection.parseModel = parseThis;

  return MaintenancesCollection;
};

module.exports = MaintenancesCollectionClassFactory;
