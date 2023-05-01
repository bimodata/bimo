import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import getIteratorForValuesAtPath from "@bimo/core-utils-get-iterator-for-values-at-path";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { TripsCollection, TripsCollectionProps } from "./TripsCollection";
import {
  VscincloirsCollection,
  VscincloirsCollectionProps,
} from "./VscincloirsCollection";
import {
  NetworkEventsCollection,
  NetworkEventsCollectionProps,
} from "./NetworkEventsCollection";
import {
  VehicleUnitsCollection,
  VehicleUnitsCollectionProps,
} from "./VehicleUnitsCollection";
import { BlocksCollection, BlocksCollectionProps } from "./BlocksCollection";
import {
  VehicleStandbysCollection,
  VehicleStandbysCollectionProps,
} from "./VehicleStandbysCollection";
import {
  MaintenancesCollection,
  MaintenancesCollectionProps,
} from "./MaintenancesCollection";
import { TripShiftsCollection, TripShiftsCollectionProps } from "./TripShiftsCollection";
import {
  ConsistChangesCollection,
  ConsistChangesCollectionProps,
} from "./ConsistChangesCollection";
import {
  OvernightLinksCollection,
  OvernightLinksCollectionProps,
} from "./OvernightLinksCollection";
import {
  VehicleTasksCollection,
  VehicleTasksCollectionProps,
} from "./VehicleTasksCollection";
import {
  VehicleScheduleOrRouteVersion,
  VehicleScheduleOrRouteVersionProps,
} from "./VehicleScheduleOrRouteVersion";
import { BlockActivity, BlockActivityProps } from "./BlockActivity";
import { Trip, TripProps } from "./Trip";

import computeVehicleTasksOfVsc from "./subs/computeVehicleTasksOfVsc";
import computeActivityEntityItemsOfVsc from "./subs/computeActivityEntityItemsOfVsc";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [
  VscincloirsCollection,
  NetworkEventsCollection,
  VehicleUnitsCollection,
  BlocksCollection,
  VehicleStandbysCollection,
  MaintenancesCollection,
  TripsCollection,
  TripShiftsCollection,
  ConsistChangesCollection,
  OvernightLinksCollection,
];

export interface VehicleScheduleProps extends ExtendedItemProps {
  vscName?: string;
  vscScenario?: string;
  vscSchedType?: string;
  vscBooking?: string;
  vscDescription?: string;
  vscSchedUnit?: string;
  vscMainRoute?: string;
  vscServiceCtxId?: string;
  vscOwner?: string;
  vscPublicAccess?: string;
  vscProdPhase?: string;
  vscPlacePattern_1?: string;
  vscPlacePattern_2?: string;
  vscKeyTimingPoint_1?: string;
  vscKeyTimingPoint_2?: string;
  vscRteverId?: string;
  vscRtverId?: string;
  vscDtverId?: string;
  vscDeadheadIntUse?: string;
  vscGarageUsageVersion?: string;
  vscParverId?: string;
  vscCvtverId?: string;
  vscVehicleActivityVersion?: string;
  vscVehicleCoverageVersion?: string;
  vscLayoverDefaultVersionId?: string;
  vscServiceGuidelineVersionId?: string;
  vscReliefOpportunityVersionId?: string;
  vscNetworkConstraintVersion?: string;
  vscPassengerLoadVersionId?: string;
  vscMeetBuilderVersionId?: string;
  vscCompositeHeadwayVersionId?: string;
  vscVehActReqVersionId?: string;
  vscPlanningMode?: string;
  vscIntId?: string;
  vscDatetimeStamp?: string;
  vscUserStamp?: string;
  vscBlockingAtt?: string;
  vscBlockingValue?: string;
  vscConsiderOtherAgencies?: string;
  vscWorkingPortionVersionId?: string;
  vscincloirs?: string;
  networkEvents?: string;
  vehicleUnits?: VehicleUnitsCollection;
  blocks?: string;
  vehicleStandbys?: string;
  maintenances?: string;
  trips?: string;
  tripShifts?: string;
  consistChanges?: string;
  overnightLinks?: string;
  _blockActivityLinksAreLoaded?: string;
}

export class VehicleSchedule extends VehicleScheduleOrRouteVersion<
  VehicleSchedule,
  VehicleScheduleProps
> {
  vscName?: string;
  vscScenario?: string;
  vscSchedType?: string;
  vscBooking?: string;
  vscDescription?: string;
  vscSchedUnit?: string;
  vscMainRoute?: string;
  vscServiceCtxId?: string;
  vscOwner?: string;
  vscPublicAccess?: string;
  vscProdPhase?: string;
  vscPlacePattern_1?: string;
  vscPlacePattern_2?: string;
  vscKeyTimingPoint_1?: string;
  vscKeyTimingPoint_2?: string;
  vscRteverId?: string;
  vscRtverId?: string;
  vscDtverId?: string;
  vscDeadheadIntUse?: string;
  vscGarageUsageVersion?: string;
  vscParverId?: string;
  vscCvtverId?: string;
  vscVehicleActivityVersion?: string;
  vscVehicleCoverageVersion?: string;
  vscLayoverDefaultVersionId?: string;
  vscServiceGuidelineVersionId?: string;
  vscReliefOpportunityVersionId?: string;
  vscNetworkConstraintVersion?: string;
  vscPassengerLoadVersionId?: string;
  vscMeetBuilderVersionId?: string;
  vscCompositeHeadwayVersionId?: string;
  vscVehActReqVersionId?: string;
  vscPlanningMode?: string;
  vscIntId?: string;
  vscDatetimeStamp?: string;
  vscUserStamp?: string;
  vscBlockingAtt?: string;
  vscBlockingValue?: string;
  vscConsiderOtherAgencies?: string;
  vscWorkingPortionVersionId?: string;
  vscincloirs: VscincloirsCollection;
  networkEvents: NetworkEventsCollection;
  vehicleUnits: VehicleUnitsCollection;
  blocks: BlocksCollection;
  vehicleStandbys: VehicleStandbysCollection;
  maintenances: MaintenancesCollection;
  trips: TripsCollection;
  tripShifts: TripShiftsCollection;
  consistChanges: ConsistChangesCollection;
  overnightLinks: OvernightLinksCollection;
  _blockActivityLinksAreLoaded?: boolean = false;
  constructor(props: VehicleScheduleProps) {
    super(props, "trip");
    this.vscName = gavpfp("vscName", props, `string`, `TEMP`);
    this.vscScenario = gavpfp("vscScenario", props, `string`, `01`);
    this.vscSchedType = gavpfp("vscSchedType", props, `string`, `6`);
    this.vscBooking = gavpfp("vscBooking", props, `string`, `TEMP`);
    this.vscDescription = gavpfp("vscDescription", props);
    this.vscSchedUnit = gavpfp("vscSchedUnit", props);
    this.vscMainRoute = gavpfp("vscMainRoute", props);
    this.vscServiceCtxId = gavpfp("vscServiceCtxId", props);
    this.vscOwner = gavpfp("vscOwner", props, `string`, `ADMIN`);
    this.vscPublicAccess = gavpfp("vscPublicAccess", props, `string`, `0`);
    this.vscProdPhase = gavpfp("vscProdPhase", props, `string`, `0`);
    this.vscPlacePattern_1 = gavpfp("vscPlacePattern_1", props);
    this.vscPlacePattern_2 = gavpfp("vscPlacePattern_2", props);
    this.vscKeyTimingPoint_1 = gavpfp("vscKeyTimingPoint_1", props);
    this.vscKeyTimingPoint_2 = gavpfp("vscKeyTimingPoint_2", props);
    this.vscRteverId = gavpfp("vscRteverId", props);
    this.vscRtverId = gavpfp("vscRtverId", props);
    this.vscDtverId = gavpfp("vscDtverId", props);
    this.vscDeadheadIntUse = gavpfp("vscDeadheadIntUse", props);
    this.vscGarageUsageVersion = gavpfp("vscGarageUsageVersion", props);
    this.vscParverId = gavpfp("vscParverId", props);
    this.vscCvtverId = gavpfp("vscCvtverId", props);
    this.vscVehicleActivityVersion = gavpfp("vscVehicleActivityVersion", props);
    this.vscVehicleCoverageVersion = gavpfp("vscVehicleCoverageVersion", props);
    this.vscLayoverDefaultVersionId = gavpfp("vscLayoverDefaultVersionId", props);
    this.vscServiceGuidelineVersionId = gavpfp("vscServiceGuidelineVersionId", props);
    this.vscReliefOpportunityVersionId = gavpfp("vscReliefOpportunityVersionId", props);
    this.vscNetworkConstraintVersion = gavpfp("vscNetworkConstraintVersion", props);
    this.vscPassengerLoadVersionId = gavpfp("vscPassengerLoadVersionId", props);
    this.vscMeetBuilderVersionId = gavpfp("vscMeetBuilderVersionId", props);
    this.vscCompositeHeadwayVersionId = gavpfp("vscCompositeHeadwayVersionId", props);
    this.vscVehActReqVersionId = gavpfp("vscVehActReqVersionId", props);
    this.vscPlanningMode = gavpfp("vscPlanningMode", props);
    this.vscIntId = gavpfp("vscIntId", props);
    this.vscDatetimeStamp = gavpfp("vscDatetimeStamp", props);
    this.vscUserStamp = gavpfp("vscUserStamp", props);
    this.vscBlockingAtt = gavpfp("vscBlockingAtt", props);
    this.vscBlockingValue = gavpfp("vscBlockingValue", props);
    this.vscConsiderOtherAgencies = gavpfp("vscConsiderOtherAgencies", props);
    this.vscWorkingPortionVersionId = gavpfp("vscWorkingPortionVersionId", props);

    /* Children */
    /* eslint-disable max-len */
    /** @type {VscincloirsCollection} */
    this.vscincloirs = gavpfp(
      "vscincloirs",
      props,
      VscincloirsCollection,
      new VscincloirsCollection(),
      { altPropName: "vscincloir", parent: this }
    );
    this.networkEvents = gavpfp(
      "networkEvents",
      props,
      NetworkEventsCollection,
      new NetworkEventsCollection(),
      { altPropName: "network_event", parent: this }
    );
    /** @type {VehicleUnitsCollection} */
    this.vehicleUnits = gavpfp(
      "vehicleUnits",
      props,
      VehicleUnitsCollection,
      new VehicleUnitsCollection(),
      { altPropName: "vehicle_unit", parent: this }
    );
    /** @type {BlocksCollection} */
    this.blocks = gavpfp("blocks", props, BlocksCollection, new BlocksCollection(), {
      altPropName: "block",
      parent: this,
    });
    /** @type {VehicleStandbysCollection} */
    this.vehicleStandbys = gavpfp(
      "vehicleStandbys",
      props,
      VehicleStandbysCollection,
      new VehicleStandbysCollection(),
      { altPropName: "vehicle_standby", parent: this }
    );
    /** @type {MaintenancesCollection} */
    this.maintenances = gavpfp(
      "maintenances",
      props,
      MaintenancesCollection,
      new MaintenancesCollection(),
      { altPropName: "maintenance", parent: this }
    );
    /** @type {TripsCollection} */
    this.trips = gavpfp("trips", props, TripsCollection, new TripsCollection(), {
      altPropName: "trip",
      parent: this,
    });
    this.tripShifts = gavpfp(
      "tripShifts",
      props,
      TripShiftsCollection,
      new TripShiftsCollection(),
      { altPropName: "trip_shift", parent: this }
    );
    /** @type {ConsistChangesCollection} */
    this.consistChanges = gavpfp(
      "consistChanges",
      props,
      ConsistChangesCollection,
      new ConsistChangesCollection(),
      { altPropName: "consist_change", parent: this }
    );
    this.overnightLinks = gavpfp(
      "overnightLinks",
      props,
      OvernightLinksCollection,
      new OvernightLinksCollection(),
      { altPropName: "overnight_link", parent: this }
    );
    /* eslint-enable max-len */
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

  get blockingVscs(): VehicleSchedule[] {
    return this._getAndSetCachedValue("blockingVscs", () => []);
  }

  /** @param {VehicleSchedule} vsc */
  addBlockingVsc(vsc) {
    const currentVscs = new Set(this.blockingVscs);
    currentVscs.add(vsc);
    this._setCachedValue("blockingVscs", Array.from(currentVscs));
  }

  /**
   *
   * @param {VehicleSchedule} vsc
   * @returns {Vscincloir}
   */
  findVscInclOirForVsc(vsc) {
    return this.vscincloirs.find(
      (vscInclOir) => vscInclOir.vscincloirIntKey === vsc.vscIntId
    );
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
    return this._getAndSetCachedValue("computedVehicleTaskObjects", () =>
      computeVehicleTasksOfVsc(this)
    );
  }

  get computedActivityEntityItemObjects() {
    return this._getAndSetCachedValue("computedActivityEntityItemObjects", () =>
      computeActivityEntityItemsOfVsc(this)
    );
  }

  get vehicleTasks() {
    return this.computedVehicleTaskObjects.vehicleTasks;
  }

  get setOfVtasByBlock() {
    return this.computedVehicleTaskObjects.setOfVtasByBlock;
  }

  get setOfVtasByBlockActivity() {
    return this.computedVehicleTaskObjects.setOfVtasByBlockActivity;
  }

  get setOfBlockSectionsByBlockActivity() {
    return this.computedVehicleTaskObjects.setOfBlockSectionsByBlockActivity;
  }

  get activityEntityItemByBlockActivity() {
    return this.computedActivityEntityItemObjects.activityEntityItemByBlockActivity;
  }

  get setOfblockActivitiesByBlockActivityEntityItem() {
    return this.computedActivityEntityItemObjects
      .setOfblockActivitiesByBlockActivityEntityItem;
  }

  get setOfAllPlaceIdentifiers() {
    const setOfAllPlaceIdentifiers = super.setOfAllPlaceIdentifiers;
    this.consistChanges.forEach((cchg) =>
      setOfAllPlaceIdentifiers.add(cchg.cchgPlaceStart)
    );
    this.vehicleStandbys.forEach((sdby) => setOfAllPlaceIdentifiers.add(sdby.sdbyPlace));
    this.maintenances.forEach((mtn) => setOfAllPlaceIdentifiers.add(mtn.mtnPlace));
    return setOfAllPlaceIdentifiers;
  }

  get arrayOfAllPlaceIdentifiers() {
    return Array.from(this.setOfAllPlaceIdentifiers);
  }

  get blocksAndActsAndSectionsByVta() {
    return this.computedVehicleTaskObjects.blocksAndActsAndSectionsByVta;
  }

  removeUnusedBlockActivities() {
    const blockActivityCollections = [
      this.maintenances,
      this.consistChanges,
      this.vehicleStandbys,
      this.trips,
    ];
    const unusedItemsByEntityClassKey = blockActivityCollections.reduce(
      (prevMap, collection) => {
        prevMap.set(collection.itemName, new Set(Array.from(collection.items as any[])));
        return prevMap;
      },
      new Map()
    );

    const getShouldContinue = () =>
      [...unusedItemsByEntityClassKey.values()].some(
        (unusedItemsSet) => unusedItemsSet.size > 0
      );

    const blockActivitiesIterator = getIteratorForValuesAtPath(
      this,
      "blocks.items.blockActivities.items"
    );

    let shouldContinue = getShouldContinue();

    let nextBlockAct = blockActivitiesIterator.next();
    while (shouldContinue && !nextBlockAct.done) {
      /** @type {BlockActivity} */
      const blockActivity = nextBlockAct.value;
      const unusedItems = unusedItemsByEntityClassKey.get(
        blockActivity.activityEntityClassKey
      );
      if (unusedItems.has(blockActivity.activityEntityItem)) {
        unusedItems.delete(blockActivity.activityEntityItem);
        shouldContinue = getShouldContinue();
      }
      nextBlockAct = blockActivitiesIterator.next();
    }

    blockActivityCollections.forEach((collection) =>
      unusedItemsByEntityClassKey
        .get(collection.itemName)
        .forEach((item) => collection.remove(item))
    );
  }
}

VehicleSchedule.hastusKeywords = ["vehicle_schedule"];
VehicleSchedule.hastusObject = "vehicle_schedule";

VehicleSchedule.allChildClasses = getAllChildClasses(childClasses);

export default VehicleSchedule;
