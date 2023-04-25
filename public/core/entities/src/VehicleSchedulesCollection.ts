/* eslint-disable no-param-reassign */
/* eslint-disable no-self-assign */

import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { evaluateItemQuery } from '@bimo/core-utils-evaluate-item-query';
import mapsAndSets from '@bimo/core-utils-maps-and-sets';


import { VehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";

import VehicleTasksCollection from `./VehicleTasksCollection`;
import TripsCollection from `./TripsCollection`;


const childClasses = [VehicleSchedule];



export interface VehicleSchedulesCollectionProps extends ExtendedCollectionProps<VehicleSchedule, VehicleScheduleProps> {
}

export class VehicleSchedulesCollection extends Collection<VehicleSchedule, VehicleScheduleProps> {
  constructor(props: VehicleSchedulesCollectionProps = {}) {
    super({
      itemName: 'VehicleSchedule',
      ItemConstructor: VehicleSchedule,
      associationType: 'aggregation',
      idPropName: `vscIntId`,
      labelPropName: `vscDescription`,
      ...props,
    });
    this.libelle = props.libelle;
    this._tripsCollectionOfAllTripsOfAllVscs = null;

    this.links = [];
  }

  /**
     *
     * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     * @returns {VehicleSchedulesCollection}
     */
  static createFromOirStyleData(oirStyleData, libelle, associationType = 'composition') {
    const rawVehicleSchedules = oirStyleData.vehicle_schedule;

    if (!rawVehicleSchedules) {
      throw new Error(`Bad oirStyleData: could not find "vehicle_schedule" key`);
    }
    const newVehicleSchedulesCollection = new VehicleSchedulesCollection({ items: rawVehicleSchedules, libelle, associationType });
    return newVehicleSchedulesCollection;
  }

  get shortLoggingOutput() {
    return `${this.libelle} - (${this.count()} vscs)`;
  }

  setScenarioNumberOnAllVscs(scenarioNumber) {
    this.forEach((vsc) => {
      vsc.vscScenario = scenarioNumber.toString();
    });
  }

  generateOirStyleData() {
    // this should disappear: OIG/OIR to JSON should take care of this.
    // eslint-disable-next-line camelcase
    const vehicle_schedule = this.map((vehicleSchedule) => {
      vehicleSchedule.trip = vehicleSchedule.trips.map((trip) => {
        trip.trip_point = trip.tripPoints && trip.tripPoints.items;
        trip.trip_tp = trip.tripTps && trip.tripTps.items;
        return trip;
      });
      vehicleSchedule.block = vehicleSchedule.blocks.map((block) => {
        block.block_activity = block.blockActivities.items.filter(
          /** Ces activités ne doivent pas être dans le fichier sinon elles font planter Hastus
           * qui les calcule tout seul            */
          (blockAct) => !['13', '14'].includes(blockAct.blkactVehicleActivityTypeNo),
        );
        block.blk_vehicle_unit_at_start = block.blkvehuoirs.items;
        return block;
      });
      vehicleSchedule.vscincloir = vehicleSchedule.vscincloirs.items;
      vehicleSchedule.network_event = vehicleSchedule.networkEvents.items;
      vehicleSchedule.vehicle_unit = vehicleSchedule.vehicleUnits.items;
      vehicleSchedule.vehicle_standby = vehicleSchedule.vehicleStandbys.items;
      vehicleSchedule.maintenance = vehicleSchedule.maintenances.items;
      vehicleSchedule.trip_shift = vehicleSchedule.tripShifts.items;
      vehicleSchedule.consist_change = vehicleSchedule.consistChanges.items;
      vehicleSchedule.overnight_link = vehicleSchedule.overnightLinks.items;

      return vehicleSchedule;
    });
    return { vehicle_schedule };
  }

  /** @type {TripsCollection} */
  get tripsCollectionOfAllTripsOfAllVscs() {
    return this._getAndSetCachedValue(
      'tripsCollectionOfAllTripsOfAllVscs',
      () => new TripsCollection(
        { items: this.flatMap((vsc) => vsc.trips.items), associationType: 'aggregation' },
      ),
    );
  }

  /** @type {VehicleTasksCollection} */
  get vehicleTasksCollectionOfAllVscs() {
    return this._getAndSetCachedValue(
      'vehicleTasksCollectionOfAllVscs',
      () => new VehicleTasksCollection(
        { items: this.flatMap((vsc) => vsc.vehicleTasks.items), associationType: 'aggregation' },
      ),
    );
  }

  /** @type {Set<string>} */
  get setOfAllPlaceIdentifiers() {
    const allSets = this.map((vsc) => vsc.setOfAllPlaceIdentifiers);
    return mapsAndSets.mergeSets(...allSets);
  }

  get arrayOfAllPlaceIdentifiers() {
    return Array.from(this.setOfAllPlaceIdentifiers);
  }

  getOrCreateVehicleScheduleByVscName(vscName, defaultPropsForNewVsc) {
    defaultPropsForNewVsc = defaultPropsForNewVsc || {};
    defaultPropsForNewVsc.vscName = vscName;
    return this.getOrCreateItemByPropName(`vscName`, vscName, defaultPropsForNewVsc);
  }

  getVehicleScheduleByVscName(vscName) {
    return this.getByPropName(`vscName`, vscName);
  }

  /**
     * Adds the vscs of the otherVscColl to this one and changes the libelle.
     * MUTATES this vscColl
     * @param {VehicleSchedulesCollection} otherVscColl The other vscCollection to merge with this one.
     * @return {VehicleSchedulesCollection} this modified vscColl
     */
  mergeWithOtherVscColl(otherVscColl) {
    this._tripsCollectionOfAllTripsOfAllVscs = null;
    this.libelle = `${this.libelle} - ${otherVscColl.libelle}`;
    otherVscColl.forEach((otherCollVsc) => {
      this.add(otherCollVsc);
    });
  }

  /**
     * Ne conserve que les block_activity qui correspondent à blockActivitySelectorQuery
     * @param {Set} blockActivitySelectorQuery - Requête JQM applicable aux objets blockActivity à conserver
     */
  filterBlockActivities(blockActivitySelectorQuery) {
    this.forEach((vechicleSchedule) => {
      vechicleSchedule.blocks.forEach((block) => {
        block.blockActivities.filter((blockActivity) => evaluateItemQuery(blockActivity, blockActivitySelectorQuery));
      });
    });
    this.removeUnusedBlockActivities();
  }

  removeUnusedBlockActivities() {
    this.forEach((vsc) => vsc.removeUnusedBlockActivities());
  }
}


VehicleSchedulesCollection.allChildClasses = getAllChildClasses(childClasses);



/* I/O info */
VehicleSchedulesCollection.defaultExportedDataDataName = `output_vsc`;
VehicleSchedulesCollection.defaultImportDataDataName = `input_vsc`;

export default VehicleSchedulesCollection;
