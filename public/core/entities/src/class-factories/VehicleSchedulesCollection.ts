import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleSchedulesCollection as BimoVehicleSchedulesCollection } from "../base-types/rawIndex";
export { VehicleSchedulesCollection as BimoVehicleSchedulesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import {
  Collection,
  ExtendedCollectionProps,
  CollectionAssociationType,
} from "@bimo/core-utils-collection";
import { evaluateItemQuery } from "@bimo/core-utils-evaluate-item-query";
import mapsAndSets from "@bimo/core-utils-maps-and-sets";

import { BimoVehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";

export interface VehicleSchedulesCollectionProps
  extends ExtendedCollectionProps<BimoVehicleSchedule, VehicleScheduleProps> {}

export function VehicleSchedulesCollectionClassFactory({
  VehicleSchedule,
  VehicleTasksCollection,
  TripsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleSchedulesCollection {
  const childClasses: (typeof Entity)[] = [VehicleSchedule];

  class VehicleSchedulesCollection extends Collection<
    BimoVehicleSchedule,
    VehicleScheduleProps
  > {
    links: any[] = [];
    _tripsCollectionOfAllTripsOfAllVscs: any = null;
    constructor(props: VehicleSchedulesCollectionProps = {}) {
      super({
        itemName: "VehicleSchedule",
        ItemConstructor: VehicleSchedule,
        associationType: "aggregation",
        idPropName: `vscIntId`,
        labelPropName: `vscDescription`,
        ...props,
      });
    }

    static createFromOirStyleData(
      oirStyleData: any,
      label: string,
      associationType: CollectionAssociationType = "composition"
    ): VehicleSchedulesCollection {
      const rawVehicleSchedules = oirStyleData.vehicle_schedule;

      if (!rawVehicleSchedules) {
        throw new Error(`Bad oirStyleData: could not find "vehicle_schedule" key`);
      }
      const newVehicleSchedulesCollection = new VehicleSchedulesCollection({
        items: rawVehicleSchedules,
        label,
        associationType,
      });
      return newVehicleSchedulesCollection;
    }

    get shortLoggingOutput() {
      return `${this.label} - (${this.count()} vscs)`;
    }

    setScenarioNumberOnAllVscs(scenarioNumber: number | string) {
      this.forEach((vsc) => {
        vsc.vscScenario = scenarioNumber.toString();
      });
    }

    generateOirStyleData() {
      // this should disappear: OIG/OIR to JSON should take care of this.
      // eslint-disable-next-line camelcase
      const vehicle_schedule = this.map((vehicleSchedule) => {
        //@ts-ignore
        vehicleSchedule.trip = vehicleSchedule.trips.map((trip) => {
          //@ts-ignore
          trip.trip_point = trip.tripPoints && trip.tripPoints.items;
          //@ts-ignore
          trip.trip_tp = trip.tripTps && trip.tripTps.items;
          return trip;
        });
        //@ts-ignore
        vehicleSchedule.block = vehicleSchedule.blocks.map((block) => {
          //@ts-ignore
          block.block_activity = block.blockActivities.items.filter(
            /** Ces activités ne doivent pas être dans le fichier sinon elles font planter Hastus
             * qui les calcule tout seul            */
            (blockAct) => !["13", "14"].includes(blockAct.blkactVehicleActivityTypeNo)
          );
          //@ts-ignore
          block.blk_vehicle_unit_at_start = block.blkvehuoirs.items;
          return block;
        });
        //@ts-ignore
        vehicleSchedule.vscincloir = vehicleSchedule.vscincloirs.items;
        //@ts-ignore
        vehicleSchedule.network_event = vehicleSchedule.networkEvents.items;
        //@ts-ignore
        vehicleSchedule.vehicle_unit = vehicleSchedule.vehicleUnits.items;
        //@ts-ignore
        vehicleSchedule.vehicle_standby = vehicleSchedule.vehicleStandbys.items;
        //@ts-ignore
        vehicleSchedule.maintenance = vehicleSchedule.maintenances.items;
        //@ts-ignore
        vehicleSchedule.trip_shift = vehicleSchedule.tripShifts.items;
        //@ts-ignore
        vehicleSchedule.consist_change = vehicleSchedule.consistChanges.items;
        //@ts-ignore
        vehicleSchedule.overnight_link = vehicleSchedule.overnightLinks.items;
        //@ts-ignore
        vehicleSchedule.scheduling_unit_date = vehicleSchedule.schedulingUnitDates.items;

        return vehicleSchedule;
      });
      return { vehicle_schedule };
    }

    get tripsCollectionOfAllTripsOfAllVscs() {
      return this._getAndSetCachedValue(
        "tripsCollectionOfAllTripsOfAllVscs",
        () =>
          new TripsCollection({
            items: this.flatMap((vsc) => vsc.trips.items),
            associationType: "aggregation",
          })
      );
    }

    get vehicleTasksCollectionOfAllVscs() {
      return this._getAndSetCachedValue(
        "vehicleTasksCollectionOfAllVscs",
        () =>
          new VehicleTasksCollection({
            items: this.flatMap((vsc) => vsc.vehicleTasks.items),
            associationType: "aggregation",
          })
      );
    }

    get setOfAllPlaceIdentifiers() {
      const allSets = this.map((vsc) => vsc.setOfAllPlaceIdentifiers);
      return mapsAndSets.mergeSets(...allSets);
    }

    get arrayOfAllPlaceIdentifiers() {
      return Array.from(this.setOfAllPlaceIdentifiers);
    }

    getOrCreateVehicleScheduleByVscName(
      vscName: string,
      defaultPropsForNewVsc: VehicleScheduleProps
    ) {
      defaultPropsForNewVsc = defaultPropsForNewVsc || {};
      defaultPropsForNewVsc.vscName = vscName;
      return this.getOrCreateItemByPropName(`vscName`, vscName, defaultPropsForNewVsc);
    }

    getVehicleScheduleByVscName(vscName: string) {
      return this.getByPropName(`vscName`, vscName);
    }

    /**
     * Adds the vscs of the otherVscColl to this one and changes the label.
     * MUTATES this vscColl
     * @param otherVscColl - The other vscCollection to merge with this one.
     * @return this modified vscColl
     */
    mergeWithOtherVscColl(
      otherVscColl: VehicleSchedulesCollection
    ): VehicleSchedulesCollection {
      this._tripsCollectionOfAllTripsOfAllVscs = null;
      this.label = `${this.label} - ${otherVscColl.label}`;
      otherVscColl.forEach((otherCollVsc) => {
        this.add(otherCollVsc);
      });
      return this;
    }

    /**
     * Ne conserve que les block_activity qui correspondent à blockActivitySelectorQuery
     * @param blockActivitySelectorQuery - Requête JQM applicable aux objets blockActivity à conserver
     */
    filterBlockActivities(blockActivitySelectorQuery: any) {
      this.forEach((vechicleSchedule) => {
        vechicleSchedule.blocks.forEach((block) => {
          block.blockActivities.filter((blockActivity) =>
            evaluateItemQuery(blockActivity, blockActivitySelectorQuery)
          );
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

  return VehicleSchedulesCollection;
}

export default VehicleSchedulesCollectionClassFactory;
