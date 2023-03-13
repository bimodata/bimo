/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const Item = require('@bimo/core-utils-item');

const BlkvehuoirClassFactory = () => {
  class Blkvehuoir extends Item {
    constructor(props) {
      super(props);
      this.blkvehuoirRank = getAndValidatePropFromProps('blkvehuoirRank', props);
      this.VehuUniqueId = getAndValidatePropFromProps('VehuUniqueId', props);
      this.bimoId = getAndValidatePropFromProps('bimoId', props);
    }

    /** @type {import('@bimo/core-entities/src/Block')} */
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

  /* Serialization utilities */
  Blkvehuoir.allChildClasses = getAllChildClasses(childClasses);
  Blkvehuoir.prototype.serializeModel = serializeThis;
  Blkvehuoir.parseModel = parseThis;

  return Blkvehuoir;
};

module.exports = BlkvehuoirClassFactory;
