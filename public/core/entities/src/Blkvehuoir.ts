/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

/* Class definition */
class Blkvehuoir extends Item {
  constructor(props) {
    super(props);
    /** */ this.blkvehuoirRank = getAndValidatePropFromProps('blkvehuoirRank', props);
    /** */ this.VehuUniqueId = getAndValidatePropFromProps('VehuUniqueId', props);
    /** Pas dans hastus, mais pour consistance */ this.bimoId = getAndValidatePropFromProps('bimoId', props);

    /* Children */

    /* Links */
  }

  /** @type {import('@bimo-hastus/domain-entities/src/Block')} */
  get block() {
    return this.parent?.parent;
  }

  get vehicleSchedule() {
    return this.block?.vehicleSchedule;
  }

  get vehicleUnit() {
    return this.vehicleSchedule?.vehicleUnits.getById(this.VehuUniqueId);
  }
}

Blkvehuoir.hastusKeywords = ['blk_vehicle_unit_at_start'];
Blkvehuoir.hastusObject = 'blkvehuoir';

/* Serialization utilities */
Blkvehuoir.allChildClasses = getAllChildClasses(childClasses);
Blkvehuoir.prototype.serializeModel = serializeThis;
Blkvehuoir.parseModel = parseThis;

module.exports = Blkvehuoir;
