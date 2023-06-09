import {
  BookingClassFactory,
  BookingsCollectionClassFactory,
  RouteVersionClassFactory,
  RouteVersionsCollectionClassFactory,
  RouteClassFactory,
  VariantClassFactory,
  VariantsCollectionClassFactory,
  VariantPointClassFactory,
  VariantPointsCollectionClassFactory,
  VehicleScheduleClassFactory,
  VehicleScheduleOrRouteVersionClassFactory,
  TripClassFactory,
  TripPointClassFactory,
  TripOrVariantClassFactory,
  TripOrVariantPointClassFactory,
  VehicleSchedulesCollectionClassFactory,
  TripsCollectionClassFactory,
  TripPointsCollectionClassFactory,
  PlaceClassFactory,
  PlacesCollectionClassFactory,
  VscincloirClassFactory,
  VscincloirsCollectionClassFactory,
  NetworkEventClassFactory,
  NetworkEventsCollectionClassFactory,
  VehicleUnitClassFactory,
  VehicleUnitsCollectionClassFactory,
  BlockClassFactory,
  BlocksCollectionClassFactory,
  BlkvehuoirClassFactory,
  BlkvehuoirsCollectionClassFactory,
  BlockActivityClassFactory,
  BlockActivitiesCollectionClassFactory,
  VehicleStandbyClassFactory,
  VehicleStandbysCollectionClassFactory,
  MaintenanceClassFactory,
  MaintenancesCollectionClassFactory,
  TripTpClassFactory,
  TripTpsCollectionClassFactory,
  TripvehgrpspecClassFactory,
  TripvehgrpspecsCollectionClassFactory,
  TripShiftClassFactory,
  TripShiftsCollectionClassFactory,
  ConsistChangeClassFactory,
  ConsistChangesCollectionClassFactory,
  OvernightLinkClassFactory,
  OvernightLinksCollectionClassFactory,
  RunTimeVersionClassFactory,
  RunTimeVersionsCollectionClassFactory,
  RunTimeClassFactory,
  RunTimesCollectionClassFactory,
  LoadTimeClassFactory,
  LoadTimesCollectionClassFactory,
  VehicleTaskClassFactory,
  VehicleTasksCollectionClassFactory,
  BlockSectionClassFactory,
  BlockSectionsCollectionClassFactory,
  BookingCalendarClassFactory,
  BookingCalendarsCollectionClassFactory,
  BookingCalendarDateClassFactory,
  BookingCalendarDatesCollectionClassFactory,
  SchedulingUnitDateClassFactory,
  SchedulingUnitDatesCollectionClassFactory,
  ServiceContextClassFactory,
  ServiceContextsCollectionClassFactory,
  ServiceContextDayClassFactory,
  ServiceContextDaysCollectionClassFactory,
  ServiceContextIntervalClassFactory,
  ServiceContextIntervalsCollectionClassFactory,
  ServiceContextParentClassFactory,
  ServiceContextParentsCollectionClassFactory,
  ServiceContextWeekClassFactory,
  ServiceContextWeeksCollectionClassFactory,
  ServiceEvolutionClassFactory,
  ServiceEvolutionsCollectionClassFactory,
  ServiceEvolutionPeriodClassFactory,
  ServiceEvolutionPeriodsCollectionClassFactory,
  ServiceEvolutionPeriodSchedulesBookingClassFactory,
  ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory,
  ServiceDefinitionClassFactory,
  ServiceDefinitionsCollectionClassFactory,
  SdefSchedulingUnitClassFactory,
  SdefSchedulingUnitsCollectionClassFactory,
  SchedulingUnitClassFactory,
  SchedulingUnitsCollectionClassFactory,
  TrainPathClassFactory,
  TrainPathsGeneralInfoClassFactory,
  TrainPathsCollectionClassFactory,
  TrainPathVariantClassFactory,
  TrainPathVariantsCollectionClassFactory,
  TrainPathVariantPointClassFactory,
  TrainPathVariantPointsCollectionClassFactory,
  TrainPathVariantDateClassFactory,
  TrainPathVariantDatesCollectionClassFactory,
  TripOrVariantSectionClassFactory,
  TripOrVariantSectionsCollectionClassFactory,
  BoundingBoxClassFactory,
  DataFileClassFactory,
  DataFilesCollectionClassFactory,
  AdjacentLinkClassFactory,
  NetworkMapClassFactory,
  NetworkMapsCollectionClassFactory,
  NetworkNodeClassFactory,
  NetworkNodesCollectionClassFactory,
  NetworkEdgeClassFactory,
  NetworkEdgesCollectionClassFactory,
  NetworkClassFactory,
  NetworksCollectionClassFactory,
  NetworkSectionClassFactory,
  NetworkSectionsCollectionClassFactory,
  RoutesCollectionClassFactory,
  SchedulingUnitRouteClassFactory,
  SchedulingUnitRoutesCollectionClassFactory,
} from "./rawIndex";

export const DefaultClassFactoryByEntityClassKey = {
  BoundingBox: BoundingBoxClassFactory,
  DataFile: DataFileClassFactory,
  DataFilesCollection: DataFilesCollectionClassFactory,

  TripOrVariantPoint: TripOrVariantPointClassFactory,

  VariantPoint: VariantPointClassFactory,
  VariantPointsCollection: VariantPointsCollectionClassFactory,

  TripOrVariant: TripOrVariantClassFactory,

  Variant: VariantClassFactory,
  VariantsCollection: VariantsCollectionClassFactory,
  Route: RouteClassFactory,
  RoutesCollection: RoutesCollectionClassFactory,

  TripPoint: TripPointClassFactory,
  TripPointsCollection: TripPointsCollectionClassFactory,
  TripTp: TripTpClassFactory,
  TripTpsCollection: TripTpsCollectionClassFactory,
  Tripvehgrpspec: TripvehgrpspecClassFactory,
  TripvehgrpspecsCollection: TripvehgrpspecsCollectionClassFactory,
  TripShift: TripShiftClassFactory,
  TripShiftsCollection: TripShiftsCollectionClassFactory,

  BlockActivity: BlockActivityClassFactory,
  BlockActivitiesCollection: BlockActivitiesCollectionClassFactory,

  Trip: TripClassFactory,
  TripsCollection: TripsCollectionClassFactory,

  Blkvehuoir: BlkvehuoirClassFactory,
  BlkvehuoirsCollection: BlkvehuoirsCollectionClassFactory,

  Block: BlockClassFactory,
  BlocksCollection: BlocksCollectionClassFactory,

  NetworkEvent: NetworkEventClassFactory,
  NetworkEventsCollection: NetworkEventsCollectionClassFactory,

  VehicleUnit: VehicleUnitClassFactory,
  VehicleUnitsCollection: VehicleUnitsCollectionClassFactory,

  VehicleStandby: VehicleStandbyClassFactory,
  VehicleStandbysCollection: VehicleStandbysCollectionClassFactory,
  Maintenance: MaintenanceClassFactory,
  MaintenancesCollection: MaintenancesCollectionClassFactory,
  ConsistChange: ConsistChangeClassFactory,
  ConsistChangesCollection: ConsistChangesCollectionClassFactory,
  OvernightLink: OvernightLinkClassFactory,
  OvernightLinksCollection: OvernightLinksCollectionClassFactory,

  VehicleScheduleOrRouteVersion: VehicleScheduleOrRouteVersionClassFactory,
  RouteVersion: RouteVersionClassFactory,
  RouteVersionsCollection: RouteVersionsCollectionClassFactory,
  Vscincloir: VscincloirClassFactory,
  VscincloirsCollection: VscincloirsCollectionClassFactory,

  VehicleTask: VehicleTaskClassFactory,
  VehicleTasksCollection: VehicleTasksCollectionClassFactory,
  BlockSection: BlockSectionClassFactory,
  BlockSectionsCollection: BlockSectionsCollectionClassFactory,

  VehicleSchedule: VehicleScheduleClassFactory,
  VehicleSchedulesCollection: VehicleSchedulesCollectionClassFactory,

  RunTime: RunTimeClassFactory,
  RunTimesCollection: RunTimesCollectionClassFactory,
  LoadTime: LoadTimeClassFactory,
  LoadTimesCollection: LoadTimesCollectionClassFactory,
  RunTimeVersion: RunTimeVersionClassFactory,
  RunTimeVersionsCollection: RunTimeVersionsCollectionClassFactory,

  Booking: BookingClassFactory,
  BookingsCollection: BookingsCollectionClassFactory,
  Place: PlaceClassFactory,
  PlacesCollection: PlacesCollectionClassFactory,

  SchedulingUnitDate: SchedulingUnitDateClassFactory,
  SchedulingUnitDatesCollection: SchedulingUnitDatesCollectionClassFactory,

  BookingCalendarDate: BookingCalendarDateClassFactory,
  BookingCalendarDatesCollection: BookingCalendarDatesCollectionClassFactory,

  ServiceContextDay: ServiceContextDayClassFactory,
  ServiceContextDaysCollection: ServiceContextDaysCollectionClassFactory,
  ServiceContextInterval: ServiceContextIntervalClassFactory,
  ServiceContextIntervalsCollection: ServiceContextIntervalsCollectionClassFactory,
  ServiceContextParent: ServiceContextParentClassFactory,
  ServiceContextParentsCollection: ServiceContextParentsCollectionClassFactory,
  ServiceContextWeek: ServiceContextWeekClassFactory,
  ServiceContextWeeksCollection: ServiceContextWeeksCollectionClassFactory,

  ServiceEvolutionPeriodSchedulesBooking:
    ServiceEvolutionPeriodSchedulesBookingClassFactory,
  ServiceEvolutionPeriodSchedulesBookingsCollection:
    ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory,

  ServiceEvolutionPeriod: ServiceEvolutionPeriodClassFactory,
  ServiceEvolutionPeriodsCollection: ServiceEvolutionPeriodsCollectionClassFactory,

  ServiceContext: ServiceContextClassFactory,
  ServiceContextsCollection: ServiceContextsCollectionClassFactory,

  ServiceEvolution: ServiceEvolutionClassFactory,
  ServiceEvolutionsCollection: ServiceEvolutionsCollectionClassFactory,

  BookingCalendar: BookingCalendarClassFactory,

  SchedulingUnitRoute: SchedulingUnitRouteClassFactory,
  SchedulingUnitRoutesCollection: SchedulingUnitRoutesCollectionClassFactory,

  SchedulingUnit: SchedulingUnitClassFactory,
  SchedulingUnitsCollection: SchedulingUnitsCollectionClassFactory,
  SdefSchedulingUnit: SdefSchedulingUnitClassFactory,
  SdefSchedulingUnitsCollection: SdefSchedulingUnitsCollectionClassFactory,

  ServiceDefinition: ServiceDefinitionClassFactory,
  ServiceDefinitionsCollection: ServiceDefinitionsCollectionClassFactory,

  TrainPathVariantPoint: TrainPathVariantPointClassFactory,
  TrainPathVariantPointsCollection: TrainPathVariantPointsCollectionClassFactory,
  TrainPathVariantDate: TrainPathVariantDateClassFactory,
  TrainPathVariantDatesCollection: TrainPathVariantDatesCollectionClassFactory,

  TrainPathVariant: TrainPathVariantClassFactory,
  TrainPathVariantsCollection: TrainPathVariantsCollectionClassFactory,
  TrainPathsGeneralInfo: TrainPathsGeneralInfoClassFactory,

  TrainPath: TrainPathClassFactory,
  TrainPathsCollection: TrainPathsCollectionClassFactory,

  BookingCalendarsCollection: BookingCalendarsCollectionClassFactory,

  TripOrVariantSection: TripOrVariantSectionClassFactory,
  TripOrVariantSectionsCollection: TripOrVariantSectionsCollectionClassFactory,

  NetworkNode: NetworkNodeClassFactory,
  NetworkNodesCollection: NetworkNodesCollectionClassFactory,
  NetworkEdge: NetworkEdgeClassFactory,
  NetworkEdgesCollection: NetworkEdgesCollectionClassFactory,
  NetworkSection: NetworkSectionClassFactory,
  NetworkSectionsCollection: NetworkSectionsCollectionClassFactory,

  AdjacentLink: AdjacentLinkClassFactory,
  NetworkMap: NetworkMapClassFactory,
  NetworkMapsCollection: NetworkMapsCollectionClassFactory,
  Network: NetworkClassFactory,
  NetworksCollection: NetworksCollectionClassFactory,
};
