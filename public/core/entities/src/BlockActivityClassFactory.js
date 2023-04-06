/* eslint-disable no-use-before-define */

/* Serialization utilities dependencies and others ... */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const BlockActivityClassFactory = () => {
  class BlockActivity extends Item {
    constructor(props) {
      super(props);
      this.blkactVehicleActivityTypeNo = getAndValidatePropFromProps('blkactVehicleActivityTypeNo', props);
      this.blkactTripNo = getAndValidatePropFromProps('blkactTripNo', props);
      this.blkactHasFixedLink = getAndValidatePropFromProps('blkactHasFixedLink', props, 'string', '0');
      this.blkactCchgNo = getAndValidatePropFromProps('blkactCchgNo', props);
      this.blkactVehicleStandbyNo = getAndValidatePropFromProps('blkactVehicleStandbyNo', props);
      this.blkactMaintenanceNo = getAndValidatePropFromProps('blkactMaintenanceNo', props);
      this.bimoId = getAndValidatePropFromProps('bimoId', props);

      if (this.blkactTripNo) {
        this.activityEntityClassKey = `Trip`;
        this.activityNameByLanguageCode = { fr: 'Voyage' };
      }
      else if (this.blkactCchgNo) {
        this.activityEntityClassKey = `ConsistChange`;
        this.activityNameByLanguageCode = { fr: 'Changement de composition' };
      }
      else if (this.blkactVehicleStandbyNo) {
        this.activityEntityClassKey = `VehicleStandby`;
        this.activityNameByLanguageCode = { fr: 'Réserve' };
      }
      else if (this.blkactMaintenanceNo) {
        this.activityEntityClassKey = `Maintenance`;
        this.activityNameByLanguageCode = { fr: 'Maintenance' };
      }
      else {
        throw new Error(`Unknown block activity`);
      }
    }

    /** @type {import('./Block')} */
    get block() {
      return this.parent && this.parent.parent;
    }

    /** @type {import('./VehicleTask')[]} */
    get vehicleTasks() {
      const setOfVtas = this.vehicleSchedule.setOfVtasByBlockActivity.get(this);
      return setOfVtas && Array.from(setOfVtas);
    }

    /** @type {import('./BlockSection')[]} */
    get blockSections() {
      const setOfBlockSections = this.vehicleSchedule.setOfBlockSectionsByBlockActivity.get(this);
      return setOfBlockSections && Array.from(setOfBlockSections);
    }

    /**
     *
     * @param {import ('./Trip')} newTrip
     */
    setNewTrip(newTrip) {
      if (this.activityEntityClassKey === 'Trip') {
        this.blkactTripNo = newTrip.trpIntNumber;
        this.vehicleSchedule.activityEntityItemByBlockActivity.set(this, newTrip);
      }
      if (this.activityEntityClassKey === 'ConsistChange') {
        this.activityEntityItem.setNewTrip(newTrip);
      }
    }

    /** @type {import ('./VehicleSchedule')} */
    get vehicleSchedule() {
      return this.block && this.block.vehicleSchedule;
    }

    get activityEntityItem() {
      return this.vehicleSchedule.activityEntityItemByBlockActivity.get(this);
    }

    // eslint-disable-next-line class-methods-use-this
    set activityEntityItem(v) {
      throw new Error(`Should not set ActivityEntityItem`);
    }

    get startTime() {
      return this.activityEntityItem.startTime;
    }

    get startTimeAsDuration() {
      return this.activityEntityItem.startTimeAsDuration;
    }

    get endTime() {
      return this.activityEntityItem.endTime;
    }

    get endTimeAsDuration() {
      return this.activityEntityItem.endTimeAsDuration;
    }

    get startPlaceId() {
      return this.activityEntityItem.startPlaceId;
    }

    get endPlaceId() {
      return this.activityEntityItem.endPlaceId;
    }

    get shortLoggingOutput() {
      try {
        return `${this.activityNameByLanguageCode && this.activityNameByLanguageCode.fr
          } (${this.blkactVehicleActivityTypeNo}) - ${this.activityEntityItem && this.activityEntityItem.shortLoggingOutput}`;
      }
      catch (error) {
        return `${this.activityNameByLanguageCode && this.activityNameByLanguageCode.fr
          } (${this.blkactVehicleActivityTypeNo}) // ${this.blkactTripNo} // ${this.bimoId}`;
      }
    }

    get mediumLoggingOutput() {
      return `${this.slo} (block: ${this.block.slo})`;
    }

    get longLoggingOutput() {
      return `${this.mlo} (vtas: ${this.vehicleTasks?.map((vta) => vta.slo).join(' / ')})`;
    }

    improveEndPlacePrecision(morePreciseEndPlace) {
      this.activityEntityItem.improveEndPlacePrecision(morePreciseEndPlace);
    }

    improveStartPlacePrecision(morePreciseStartPlace) {
      this.activityEntityItem.improveStartPlacePrecision(morePreciseStartPlace);
    }

    shiftTimes(shiftInSeconds) {
      this.activityEntityItem.shiftTimes(shiftInSeconds);
    }

    get _indexInSortedParent() {
      if (!this.parent) return null;
      this.parent.sortByTime();
      return this.parent.indexOf(this);
    }

    getNthActivityFromThisOne(n) {
      return this.parent && this.parent.items[this._indexInSortedParent + n];
    }

    get nextBlockActivity() {
      return this.getNthActivityFromThisOne(1);
    }

    get previousBlockActivity() {
      return this.getNthActivityFromThisOne(-1);
    }
  }

  /* Serialization utilities */
  BlockActivity.allChildClasses = getAllChildClasses(childClasses);
  BlockActivity.prototype.serializeModel = serializeThis;
  BlockActivity.parseModel = parseThis;

  return BlockActivity;
};

module.exports = BlockActivityClassFactory;
