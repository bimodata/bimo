const { Item } = require('@bimo/core-utils-collection');

const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const VehicleSchedule = require('./VehicleSchedule');

/* Class definition */
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

VehicleUnit.hastusKeywords = ['vehicle_unit'];
VehicleUnit.hastusObject = 'vehicle_unit';

/* Serialization utilities */
VehicleUnit.allChildClasses = getAllChildClasses(childClasses);
VehicleUnit.prototype.serializeModel = serializeThis;
VehicleUnit.parseModel = parseThis;

module.exports = VehicleUnit;
