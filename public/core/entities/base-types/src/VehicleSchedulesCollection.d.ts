import {
  Collection,
  ExtendedCollectionProps,
  CollectionAssociationType,
} from "@bimo/core-utils-collection";
import { VehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";
import VehicleTasksCollection from "./VehicleTasksCollection";
import TripsCollection from "./TripsCollection";
export interface VehicleSchedulesCollectionProps
  extends ExtendedCollectionProps<VehicleSchedule, VehicleScheduleProps> {}
export declare class VehicleSchedulesCollection extends Collection<
  VehicleSchedule,
  VehicleScheduleProps
> {
  libelle: string;
  links: any[];
  _tripsCollectionOfAllTripsOfAllVscs: any;
  constructor(props?: VehicleSchedulesCollectionProps);
  static createFromOirStyleData(
    oirStyleData: any,
    libelle: string,
    associationType?: CollectionAssociationType
  ): VehicleSchedulesCollection;
  get shortLoggingOutput(): string;
  setScenarioNumberOnAllVscs(scenarioNumber: number | string): void;
  generateOirStyleData(): {
    vehicle_schedule: any[];
  };
  /** @type {TripsCollection} */
  get tripsCollectionOfAllTripsOfAllVscs(): TripsCollection;
  /** @type {VehicleTasksCollection} */
  get vehicleTasksCollectionOfAllVscs(): VehicleTasksCollection;
  /** @type {Set<string>} */
  get setOfAllPlaceIdentifiers(): any;
  get arrayOfAllPlaceIdentifiers(): unknown[];
  getOrCreateVehicleScheduleByVscName(
    vscName: string,
    defaultPropsForNewVsc: VehicleScheduleProps
  ): VehicleSchedule;
  getVehicleScheduleByVscName(vscName: string): VehicleSchedule | undefined;
  /**
   * Adds the vscs of the otherVscColl to this one and changes the libelle.
   * MUTATES this vscColl
   * @param otherVscColl - The other vscCollection to merge with this one.
   * @return this modified vscColl
   */
  mergeWithOtherVscColl(
    otherVscColl: VehicleSchedulesCollection
  ): VehicleSchedulesCollection;
  /**
   * Ne conserve que les block_activity qui correspondent à blockActivitySelectorQuery
   * @param {Set} blockActivitySelectorQuery - Requête JQM applicable aux objets blockActivity à conserver
   */
  filterBlockActivities(blockActivitySelectorQuery: any): void;
  removeUnusedBlockActivities(): void;
}
export default VehicleSchedulesCollection;
