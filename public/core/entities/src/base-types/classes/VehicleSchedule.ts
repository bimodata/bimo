import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripsCollection } from "./TripsCollection";
import { Vscincloir } from "./Vscincloir";
import { VscincloirsCollection } from "./VscincloirsCollection";
import { NetworkEventsCollection } from "./NetworkEventsCollection";
import { VehicleUnitsCollection } from "./VehicleUnitsCollection";
import { BlocksCollection } from "./BlocksCollection";
import { VehicleStandbysCollection } from "./VehicleStandbysCollection";
import { MaintenancesCollection } from "./MaintenancesCollection";
import { TripShiftsCollection } from "./TripShiftsCollection";
import { ConsistChangesCollection } from "./ConsistChangesCollection";
import { OvernightLinksCollection } from "./OvernightLinksCollection";
import { VehicleTasksCollection } from "./VehicleTasksCollection";
import { VehicleScheduleOrRouteVersion } from "./VehicleScheduleOrRouteVersion";
import { BlockActivity } from "./BlockActivity";
import { Trip } from "./Trip";
import { BaseBlockActivityItem } from "./BlockActivityItem";

import { BlockActivitiesCollection } from "./BlockActivitiesCollection";
import { BlockSectionsCollection } from "./BlockSectionsCollection";

export interface BlocksAndActsAndSections {
  blocks: BlocksCollection;
  blockActivities: BlockActivitiesCollection;
  blockSections: BlockSectionsCollection;
}
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
  vscincloirs?: VscincloirsCollection;
  networkEvents?: NetworkEventsCollection;
  vehicleUnits?: VehicleUnitsCollection;
  blocks?: BlocksCollection;
  vehicleStandbys?: VehicleStandbysCollection;
  maintenances?: MaintenancesCollection;
  trips?: TripsCollection;
  tripShifts?: TripShiftsCollection;
  consistChanges?: ConsistChangesCollection;
  overnightLinks?: OvernightLinksCollection;
  _blockActivityLinksAreLoaded?: string;
}
export declare class VehicleSchedule extends VehicleScheduleOrRouteVersion<
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
  _blockActivityLinksAreLoaded?: boolean;
  constructor(props: VehicleScheduleProps);
  get shortLoggingOutput(): string;
  get businessLoggingOutput(): string;
  get businessKey(): string;
  addTrip(trip: Trip): void;
  addIncludedVsc(vsc: VehicleSchedule): void;
  removeIncludedVsc(vsc: VehicleSchedule): void;
  get blockingVscs(): VehicleSchedule[];
  get includedVscs(): VehicleSchedule[];
  addBlockingVsc(vsc: VehicleSchedule): void;
  findVscInclOirForVsc(vsc: VehicleSchedule): Vscincloir;
  /**
   * @param vsc
   * @returns  true if this vsc includes the passed in vsc, false otherwise.
   */
  includesVsc(vsc: VehicleSchedule): boolean;
  removeTrip(trip: Trip): void;
  getTripByTripNumber(tripNumber: string): Trip | undefined;
  get computedVehicleTaskObjects(): {
    vehicleTasks: VehicleTasksCollection;
    setOfVtasByBlock: Map<
      import("./Block").Block,
      Set<import("./VehicleTask").VehicleTask>
    >;
    setOfVtasByBlockActivity: Map<
      BlockActivity,
      Set<import("./VehicleTask").VehicleTask>
    >;
    blocksAndActsAndSectionsByVta: Map<
      import("./VehicleTask").VehicleTask,
      BlocksAndActsAndSections
    >;
    setOfBlockSectionsByBlockActivity: Map<
      BlockActivity,
      Set<import("./BlockSection").BlockSection>
    >;
  };
  get computedActivityEntityItemObjects(): {
    setOfBlockActivitiesByBlockActivityEntityItem: Map<any, any>;
    activityEntityItemByBlockActivity: Map<
      BlockActivity,
      import("./BlockActivityItem").BlockActivityItem<BaseBlockActivityItem>
    >;
  };
  get tripsAndIncludedTrips(): TripsCollection;
  get vehicleTasks(): VehicleTasksCollection;
  get setOfVtasByBlock(): Map<
    import("./Block").Block,
    Set<import("./VehicleTask").VehicleTask>
  >;
  get setOfVtasByBlockActivity(): Map<
    BlockActivity,
    Set<import("./VehicleTask").VehicleTask>
  >;
  get setOfBlockSectionsByBlockActivity(): Map<
    BlockActivity,
    Set<import("./BlockSection").BlockSection>
  >;
  get activityEntityItemByBlockActivity(): Map<
    BlockActivity,
    import("./BlockActivityItem").BlockActivityItem<BaseBlockActivityItem>
  >;
  get setOfBlockActivitiesByBlockActivityEntityItem(): Map<any, any>;
  get setOfAllPlaceIdentifiers(): Set<string>;
  get arrayOfAllPlaceIdentifiers(): string[];
  get blocksAndActsAndSectionsByVta(): Map<
    import("./VehicleTask").VehicleTask,
    BlocksAndActsAndSections
  >;
  removeUnusedBlockActivities(): void;
}
