const _ = require('lodash');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const { Item } = require('@bimo/core-utils-collection');

const BlockClassFactory = ({
  BlkvehuoirsCollection,
  BlockActivitiesCollection,
}) => {
  /* Serialization utilities dependencies */
  const childClasses = [BlkvehuoirsCollection, BlockActivitiesCollection];

  class Block extends Item {
    constructor(props) {
      super(props);
      /** */ this.blkIntNumber = getAndValidatePropFromProps('blkIntNumber', props);
      /** */ this.blkNumber = getAndValidatePropFromProps('blkNumber', props, 'string', this.blkIntNumber);
      /** */ this.blkRouteUser = getAndValidatePropFromProps('blkRouteUser', props);
      /** */ this.blkPrepOutUser = getAndValidatePropFromProps('blkPrepOutUser', props);
      /** */ this.blkPrepInUser = getAndValidatePropFromProps('blkPrepInUser', props);
      /** */ this.blkStartUpAtStationUser = getAndValidatePropFromProps('blkStartUpAtStationUser', props, `string`, `0`);
      /** */ this.blkShutDownAtStationUser = getAndValidatePropFromProps('blkShutDownAtStationUser', props, `string`, `0`);
      /** */ this.blkVehicleGroup = getAndValidatePropFromProps('blkVehicleGroup', props);
      /** */ this.blkVehicleType = getAndValidatePropFromProps('blkVehicleType', props);
      /** */ this.blkGarageUser = getAndValidatePropFromProps('blkGarageUser', props);
      /** */ this.blkVehicleNumber = getAndValidatePropFromProps('blkVehicleNumber', props);
      /** */ this.blkGroup = getAndValidatePropFromProps('blkGroup', props);
      /** */ this.blkIsFixed = getAndValidatePropFromProps('blkIsFixed', props, `string`, `0`);
      /** */ this.blkVehUnitCount = getAndValidatePropFromProps('blkVehUnitCount', props);
      /** */ this.blkRelTypeStrt = getAndValidatePropFromProps('blkRelTypeStrt', props);
      /** */ this.blkRelTypeEnd = getAndValidatePropFromProps('blkRelTypeEnd', props);
      /** */ this.blkConsistPatternUser = getAndValidatePropFromProps('blkConsistPatternUser', props);

      /* Children */
      /** @type {BlkvehuoirsCollection} */
      this.blkvehuoirs = getAndValidatePropFromProps('blkvehuoirs', props, BlkvehuoirsCollection, new BlkvehuoirsCollection(), { altPropName: 'blkvehuoir', parent: this });
      /** @type {BlockActivitiesCollection} */
      this.blockActivities = getAndValidatePropFromProps('blockActivities', props, BlockActivitiesCollection, new BlockActivitiesCollection(), { altPropName: 'block_activity', parent: this });
    }

    /** @type {import('./VehicleTask')[]} */
    get vehicleTasks() {
      return Array.from(this.vehicleSchedule.setOfVtasByBlock.get(this));
    }

    get vehicleUnitsAtStart() {
      return this.blkvehuoirs
        .map((blkVehuOir) => this.vehicleSchedule.vehicleUnits.getById(blkVehuOir.VehuUniqueId));
    }

    /** @type {import('./VehicleSchedule')} */
    get vehicleSchedule() {
      return this.parent && this.parent.parent;
    }

    get startTimeAsDuration() {
      return _.minBy(this.blockActivities.items, 'startTimeAsDuration').startTimeAsDuration;
    }

    get endTimeAsDuration() {
      return _.maxBy(this.blockActivities.items, 'endTimeAsDuration').endTimeAsDuration;
    }

    sortBlockActivitiesByTime() {
      this.blockActivities.sortByTime();
    }

    addTrip(trip) {
      this.blockActivities.addTrip(trip);
    }

    addVehuAtStart(vehu) {
      this.blkVehUnitCount += 1;
      this.blkvehuoirs.createNewItem({
        blkvehuoirRank: this.blkVehUnitCount,
        VehuUniqueId: vehu.vehuInternalNumber,
      });
    }

    removeTrip(trip) {
      this.blockActivities.removeTrip(trip);
    }

    addTrips(...trips) {
      trips.forEach((trip) => {
        this.addTrip(trip);
      });
    }

    get shortLoggingOutput() {
      return `${this.blkNumber}-[${this.blockActivities.length}]`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput} (vsc: ${this.vehicleSchedule.shortLoggingOutput})`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput}\n${this.blockActivities.longLoggingOutput}`;
    }
  }

  /* Serialization utilities */
  Block.allChildClasses = getAllChildClasses(childClasses);
  Block.prototype.serializeModel = serializeThis;
  Block.parseModel = parseThis;

  return Block;
};

module.exports = BlockClassFactory;
