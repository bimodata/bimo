/* Linked Classes */
const VehicleUnit = require('./VehicleUnit');

/* Serialization utilities dependencies */
const childClasses = [VehicleUnit];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
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

module.exports = VehicleUnitsCollection;
