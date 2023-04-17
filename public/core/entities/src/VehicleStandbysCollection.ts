const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');
const VehicleStandby = require('./VehicleStandby');

const childClasses = [VehicleStandby];

/** @extends {Collection<VehicleStandby>} */
class VehicleStandbysCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'VehicleStandby',
      ItemConstructor: VehicleStandby,
      idPropName: `bimoId`,
      businessIdPropName: `sdbyStandbyNo`,
      labelPropName: `sdbyComment`,
      ...props,
    });
  }
}

/* Serialization utilities */
VehicleStandbysCollection.allChildClasses = getAllChildClasses(childClasses);
VehicleStandbysCollection.prototype.serializeModel = serializeThis;
VehicleStandbysCollection.parseModel = parseThis;

module.exports = VehicleStandbysCollection;
