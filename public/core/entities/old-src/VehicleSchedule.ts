const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const getIteratorForValuesAtPath = require('@bimo/core-utils-get-iterator-for-values-at-path');

const TripsCollection = require('./TripsCollection');
const VscincloirsCollection = require('./VscincloirsCollection');
const NetworkEventsCollection = require('./NetworkEventsCollection');
const VehicleUnitsCollection = require('./VehicleUnitsCollection');
const BlocksCollection = require('./BlocksCollection');
const VehicleStandbysCollection = require('./VehicleStandbysCollection');
const MaintenancesCollection = require('./MaintenancesCollection');
const TripShiftsCollection = require('./TripShiftsCollection');
const ConsistChangesCollection = require('./ConsistChangesCollection');
const OvernightLinksCollection = require('./OvernightLinksCollection');
const VehicleTasksCollection = require('./VehicleTasksCollection');
const VehicleScheduleOrRouteVersion = require('./VehicleScheduleOrRouteVersion');
const BlockActivity = require('./BlockActivity');
const Trip = require('./Trip');

const computeVehicleTasksOfVsc = require('./subs/computeVehicleTasksOfVsc');
const computeActivityEntityItemsOfVsc = require('./subs/computeActivityEntityItemsOfVsc');

const childClasses = [
  VscincloirsCollection, NetworkEventsCollection, VehicleUnitsCollection,
  BlocksCollection, VehicleStandbysCollection, MaintenancesCollection, TripsCollection,
  TripShiftsCollection, ConsistChangesCollection, OvernightLinksCollection,
];

/** @extends {VehicleScheduleOrRouteVersion<Trip>}  */
class VehicleSchedule extends VehicleScheduleOrRouteVersion {
  constructor(props) {
    super(props, 'trip');
    this.vscName = getAndValidatePropFromProps('vscName', props, `string`, `TEMP`);
    this.vscScenario = getAndValidatePropFromProps('vscScenario', props, `string`, `01`);
    this.vscSchedType = getAndValidatePropFromProps('vscSchedType', props, `string`, `6`);
    this.vscBooking = getAndValidatePropFromProps('vscBooking', props, `string`, `TEMP`);
    this.vscDescription = getAndValidatePropFromProps('vscDescription', props);
    this.vscSchedUnit = getAndValidatePropFromProps('vscSchedUnit', props);
    this.vscMainRoute = getAndValidatePropFromProps('vscMainRoute', props);
    this.vscServiceCtxId = getAndValidatePropFromProps('vscServiceCtxId', props);
    this.vscOwner = getAndValidatePropFromProps('vscOwner', props, `string`, `ADMIN`);
    this.vscPublicAccess = getAndValidatePropFromProps('vscPublicAccess', props, `string`, `0`);
    this.vscProdPhase = getAndValidatePropFromProps('vscProdPhase', props, `string`, `0`);
    this.vscPlacePattern_1 = getAndValidatePropFromProps('vscPlacePattern_1', props);
    this.vscPlacePattern_2 = getAndValidatePropFromProps('vscPlacePattern_2', props);
    this.vscKeyTimingPoint_1 = getAndValidatePropFromProps('vscKeyTimingPoint_1', props);
    this.vscKeyTimingPoint_2 = getAndValidatePropFromProps('vscKeyTimingPoint_2', props);
    this.vscRteverId = getAndValidatePropFromProps('vscRteverId', props);
    this.vscRtverId = getAndValidatePropFromProps('vscRtverId', props);
    this.vscDtverId = getAndValidatePropFromProps('vscDtverId', props);
    this.vscDeadheadIntUse = getAndValidatePropFromProps('vscDeadheadIntUse', props);
    this.vscGarageUsageVersion = getAndValidatePropFromProps('vscGarageUsageVersion', props);
    this.vscParverId = getAndValidatePropFromProps('vscParverId', props);
    this.vscCvtverId = getAndValidatePropFromProps('vscCvtverId', props);
    this.vscVehicleActivityVersion = getAndValidatePropFromProps('vscVehicleActivityVersion', props);
    this.vscVehicleCoverageVersion = getAndValidatePropFromProps('vscVehicleCoverageVersion', props);
    this.vscLayoverDefaultVersionId = getAndValidatePropFromProps('vscLayoverDefaultVersionId', props);
    this.vscServiceGuidelineVersionId = getAndValidatePropFromProps('vscServiceGuidelineVersionId', props);
    this.vscReliefOpportunityVersionId = getAndValidatePropFromProps('vscReliefOpportunityVersionId', props);
    this.vscNetworkConstraintVersion = getAndValidatePropFromProps('vscNetworkConstraintVersion', props);
    this.vscPassengerLoadVersionId = getAndValidatePropFromProps('vscPassengerLoadVersionId', props);
    this.vscMeetBuilderVersionId = getAndValidatePropFromProps('vscMeetBuilderVersionId', props);
    this.vscCompositeHeadwayVersionId = getAndValidatePropFromProps('vscCompositeHeadwayVersionId', props);
    this.vscVehActReqVersionId = getAndValidatePropFromProps('vscVehActReqVersionId', props);
    this.vscPlanningMode = getAndValidatePropFromProps('vscPlanningMode', props);
    this.vscIntId = getAndValidatePropFromProps('vscIntId', props);
    this.vscDatetimeStamp = getAndValidatePropFromProps('vscDatetimeStamp', props);
    this.vscUserStamp = getAndValidatePropFromProps('vscUserStamp', props);
    this.vscBlockingAtt = getAndValidatePropFromProps('vscBlockingAtt', props);
    this.vscBlockingValue = getAndValidatePropFromProps('vscBlockingValue', props);
    this.vscConsiderOtherAgencies = getAndValidatePropFromProps('vscConsiderOtherAgencies', props);
    this.vscWorkingPortionVersionId = getAndValidatePropFromProps('vscWorkingPortionVersionId', props);

    /* Children */
    /* eslint-disable max-len */
    /** @type {VscincloirsCollection} */
    this.vscincloirs = getAndValidatePropFromProps('vscincloirs', props, VscincloirsCollection, new VscincloirsCollection(), { altPropName: 'vscincloir', parent: this });
    this.networkEvents = getAndValidatePropFromProps('networkEvents', props, NetworkEventsCollection, new NetworkEventsCollection(), { altPropName: 'network_event', parent: this });
    /** @type {VehicleUnitsCollection} */
    this.vehicleUnits = getAndValidatePropFromProps('vehicleUnits', props, VehicleUnitsCollection, new VehicleUnitsCollection(), { altPropName: 'vehicle_unit', parent: this });
    /** @type {BlocksCollection} */
    this.blocks = getAndValidatePropFromProps('blocks', props, BlocksCollection, new BlocksCollection(), { altPropName: 'block', parent: this });
    /** @type {VehicleStandbysCollection} */
    this.vehicleStandbys = getAndValidatePropFromProps('vehicleStandbys', props, VehicleStandbysCollection, new VehicleStandbysCollection(), { altPropName: 'vehicle_standby', parent: this });
    /** @type {MaintenancesCollection} */
    this.maintenances = getAndValidatePropFromProps('maintenances', props, MaintenancesCollection, new MaintenancesCollection(), { altPropName: 'maintenance', parent: this });
    /** @type {TripsCollection} */
    this.trips = getAndValidatePropFromProps('trips', props, TripsCollection, new TripsCollection(), { altPropName: 'trip', parent: this });
    this.tripShifts = getAndValidatePropFromProps('tripShifts', props, TripShiftsCollection, new TripShiftsCollection(), { altPropName: 'trip_shift', parent: this });
    /** @type {ConsistChangesCollection} */
    this.consistChanges = getAndValidatePropFromProps('consistChanges', props, ConsistChangesCollection, new ConsistChangesCollection(), { altPropName: 'consist_change', parent: this });
    this.overnightLinks = getAndValidatePropFromProps('overnightLinks', props, OvernightLinksCollection, new OvernightLinksCollection(), { altPropName: 'overnight_link', parent: this });
    /* eslint-enable max-len */

    /* Links */
    this._blockActivityLinksAreLoaded = false;
  }

  get shortLoggingOutput() {
    return `${this.vscIntId}: ${this.vscName} - ${this.vscDescription} (${this.vscSchedType})`;
  }

  get businessLoggingOutput() {
    return `${this.vscName} - ${this.vscDescription} (${this.vscSchedType})\n${this.vehicleTasks.blo}`;
  }

  addTrip(trip) {
    this.trips.add(trip);
  }

  /** @param {VehicleSchedule} vsc */
  addIncludedVsc(vsc) {
    if (vsc.vscincloirs.count() > 0) {
      throw new Error(`Impossible d'inclure un multi vsc dans un autre multi vsc.`);
    }
    const vscInclOir = this.vscincloirs.createNewItem({ vscincloirIntKey: vsc.vscIntId });
    vscInclOir.vsc = vsc;
    vsc.addBlockingVsc(this);
  }

  /** @param {VehicleSchedule} vsc */
  removeIncludedVsc(vsc) {
    this.vscincloirs.remove(this.findVscInclOirForVsc(vsc));
  }

  /** @type {VehicleSchedule[]} */
  get blockingVscs() {
    return this._getAndSetCachedValue('blockingVscs', () => []);
  }

  /** @param {VehicleSchedule} vsc */
  addBlockingVsc(vsc) {
    const currentVscs = new Set(this.blockingVscs);
    currentVscs.add(vsc);
    this._setCachedValue('blockingVscs', Array.from(currentVscs));
  }

  /**
   *
   * @param {VehicleSchedule} vsc
   * @returns {Vscincloir}
   */
  findVscInclOirForVsc(vsc) {
    return this.vscincloirs.find((vscInclOir) => vscInclOir.vscincloirIntKey === vsc.vscIntId);
  }

  /**
   *
   * @param {VehicleSchedule} vsc
   * @returns {Boolean} true if this vsc includes the passed in vsc, false otherwise.
   */
  includesVsc(vsc) {
    return !!this.findVscInclOirForVsc(vsc);
  }

  removeTrip(trip) {
    if (trip.block) trip.block.removeTrip(trip);
    this.trips.remove(trip);
  }

  getTripByTripNumber(tripNumber) {
    return this.trips.getByPropName(`trpNumber`, tripNumber);
  }

  get computedVehicleTaskObjects() {
    return this._getAndSetCachedValue(
      'computedVehicleTaskObjects',
      () => computeVehicleTasksOfVsc(this),
    );
  }

  get computedActivityEntityItemObjects() {
    return this._getAndSetCachedValue(
      'computedActivityEntityItemObjects',
      () => computeActivityEntityItemsOfVsc(this),
    );
  }

  /** @type {import ('./VehicleTasksCollection')} */
  get vehicleTasks() {
    return this.computedVehicleTaskObjects.vehicleTasks;
  }

  /** @type {Map<import ('./Block'), Set<import ('./VehicleTask')>>} */
  get setOfVtasByBlock() {
    return this.computedVehicleTaskObjects.setOfVtasByBlock;
  }

  /** @type {Map<import ('./BlockActivity'), Set<import ('./VehicleTask')>>} */
  get setOfVtasByBlockActivity() {
    return this.computedVehicleTaskObjects.setOfVtasByBlockActivity;
  }

  /** @type {Map<import ('./BlockActivity'), Set<import ('./BlockSection')>>} */
  get setOfBlockSectionsByBlockActivity() {
    return this.computedVehicleTaskObjects.setOfBlockSectionsByBlockActivity;
  }

  get activityEntityItemByBlockActivity() {
    return this.computedActivityEntityItemObjects.activityEntityItemByBlockActivity;
  }

  /** @type {Map<Object, import ('./BlockActivity')>} */
  get setOfblockActivitiesByBlockActivityEntityItem() {
    return this.computedActivityEntityItemObjects.setOfblockActivitiesByBlockActivityEntityItem;
  }

  /** @returns {Set<string>} */
  get setOfAllPlaceIdentifiers() {
    const setOfAllPlaceIdentifiers = super.setOfAllPlaceIdentifiers;
    this.consistChanges.forEach((cchg) => setOfAllPlaceIdentifiers.add(cchg.cchgPlaceStart));
    this.vehicleStandbys.forEach((sdby) => setOfAllPlaceIdentifiers.add(sdby.sdbyPlace));
    this.maintenances.forEach((mtn) => setOfAllPlaceIdentifiers.add(mtn.mtnPlace));
    return setOfAllPlaceIdentifiers;
  }

  /** @returns {string[]} */
  get arrayOfAllPlaceIdentifiers() {
    return Array.from(this.setOfAllPlaceIdentifiers);
  }

  /**
 * @typedef {Object} BlocksAndActsAndSections
 * @property {import('./BlocksCollection')} blocks
 * @property {import('./BlockActivitiesCollection')} blockActivities
 * @property {Object[]} blockSections
 */

  /** @type {Map<import ('./VehicleTask'), BlocksAndActsAndSections>} */
  get blocksAndActsAndSectionsByVta() {
    return this.computedVehicleTaskObjects.blocksAndActsAndSectionsByVta;
  }

  removeUnusedBlockActivities() {
    const blockActivityCollections = [this.maintenances, this.consistChanges, this.vehicleStandbys, this.trips];
    const unusedItemsByEntityClassKey = blockActivityCollections.reduce((prevMap, collection) => {
      prevMap.set(collection.itemName, new Set(Array.from(collection.items)));
      return prevMap;
    }, new Map());

    const getShouldContinue = () => [...unusedItemsByEntityClassKey.values()].some((unusedItemsSet) => unusedItemsSet.size > 0);

    const blockActivitiesIterator = getIteratorForValuesAtPath(this, 'blocks.items.blockActivities.items');

    let shouldContinue = getShouldContinue();

    let nextBlockAct = blockActivitiesIterator.next();
    while (shouldContinue && !nextBlockAct.done) {
      /** @type {BlockActivity} */
      const blockActivity = nextBlockAct.value;
      const unusedItems = unusedItemsByEntityClassKey.get(blockActivity.activityEntityClassKey);
      if (unusedItems.has(blockActivity.activityEntityItem)) {
        unusedItems.delete(blockActivity.activityEntityItem);
        shouldContinue = getShouldContinue();
      }
      nextBlockAct = blockActivitiesIterator.next();
    }

    blockActivityCollections.forEach(
      (collection) => unusedItemsByEntityClassKey.get(collection.itemName).forEach((item) => collection.remove(item)),
    );
  }
}

VehicleSchedule.hastusKeywords = ['vehicle_schedule'];
VehicleSchedule.hastusObject = 'vehicle_schedule';

/* Serialization utilities */
VehicleSchedule.allChildClasses = getAllChildClasses(childClasses);
VehicleSchedule.prototype.serializeModel = serializeThis;
VehicleSchedule.parseModel = parseThis;

module.exports = VehicleSchedule;
