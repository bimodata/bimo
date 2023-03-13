const Item = require('@bimo/core-utils-item');

const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const VehicleUnitClassFactory = () => {
  const childClasses = [];

  class VehicleUnit extends Item {
    constructor(props) {
      super(props);
      /** */ this.vehuInternalNumber = getAndValidatePropFromProps('vehuInternalNumber', props);
      /** */ this.vehuIdentifierUser = getAndValidatePropFromProps('vehuIdentifierUser', props);
      /** */ this.vehuVehicleGroup = getAndValidatePropFromProps('vehuVehicleGroup', props);
      /** */ this.vehuVehicleType = getAndValidatePropFromProps('vehuVehicleType', props);

      /** */ this.vehuCodeRoulement = getAndValidatePropFromProps('vehuCodeRoulement', props);

      /* Children */

      /* Links */

      this.vehicleTask = undefined;
    }

    get shortLoggingOutput() {
      return `internalNumber: ${this.vehuInternalNumber} userIdentifier: ${this.vehuIdentifierUser}`;
    }

    /** @type {VehicleSchedule} */
    get vehicleSchedule() {
      return this.parent && this.parent.parent;
    }
  }

  /* Serialization utilities */
  VehicleUnit.allChildClasses = getAllChildClasses(childClasses);
  VehicleUnit.prototype.serializeModel = serializeThis;
  VehicleUnit.parseModel = parseThis;

  return VehicleUnit;
};

module.exports = VehicleUnitClassFactory;
