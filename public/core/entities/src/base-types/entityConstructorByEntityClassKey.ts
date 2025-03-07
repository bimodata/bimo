import {
  Booking,
  BookingsCollection,
  RouteVersion,
  RouteVersionsCollection,
  Route,
  RoutesCollection,
  Variant,
  VariantsCollection,
  VariantPoint,
  VariantPointsCollection,
  VariantItinerary,
  VariantItinerariesCollection,
  ItinerarySegment,
  ItinerarySegmentsCollection,
  VehicleSchedule,
  VehicleScheduleOrRouteVersion,
  Trip,
  TripPoint,
  TripOrVariant,
  TripOrVariantPoint,
  VehicleSchedulesCollection,
  TripsCollection,
  TripPointsCollection,
  Place,
  PlacesCollection,
  Vscincloir,
  VscincloirsCollection,
  NetworkEvent,
  NetworkEventsCollection,
  VehicleUnit,
  VehicleUnitsCollection,
  Block,
  BlocksCollection,
  Blkvehuoir,
  BlkvehuoirsCollection,
  BlockActivity,
  BlockActivitiesCollection,
  VehicleStandby,
  VehicleStandbysCollection,
  Maintenance,
  MaintenancesCollection,
  TripTp,
  TripTpsCollection,
  Tripvehgrpspec,
  TripvehgrpspecsCollection,
  TripShift,
  TripShiftsCollection,
  ConsistChange,
  ConsistChangesCollection,
  OvernightLink,
  OvernightLinksCollection,
  RunTimeVersion,
  RunTimeVersionsCollection,
  RunTime,
  RunTimesCollection,
  PortionWorkingVersion,
  PortionWorkingVersionsCollection,
  PortionWorking,
  PortionWorkingsCollection,
  LoadTime,
  LoadTimesCollection,
  VehicleTask,
  VehicleTasksCollection,
  BlockSection,
  BlockSectionsCollection,
  BookingCalendar,
  BookingCalendarsCollection,
  BookingCalendarDate,
  BookingCalendarDatesCollection,
  SchedulingUnitDate,
  SchedulingUnitDatesCollection,
  SchedulingUnitRoute,
  SchedulingUnitRoutesCollection,
  ServiceContext,
  ServiceContextsCollection,
  ServiceContextDay,
  ServiceContextDaysCollection,
  ServiceContextInterval,
  ServiceContextIntervalsCollection,
  ServiceContextParent,
  ServiceContextParentsCollection,
  ServiceContextWeek,
  ServiceContextWeeksCollection,
  ServiceEvolution,
  ServiceEvolutionsCollection,
  ServiceEvolutionPeriod,
  ServiceEvolutionPeriodsCollection,
  ServiceEvolutionPeriodSchedulesBooking,
  ServiceEvolutionPeriodSchedulesBookingsCollection,
  ServiceDefinition,
  ServiceDefinitionsCollection,
  SdefSchedulingUnit,
  SdefSchedulingUnitsCollection,
  SchedulingUnit,
  SchedulingUnitsCollection,
  TrainPath,
  TrainPathsGeneralInfo,
  TrainPathsCollection,
  TrainPathVariant,
  TrainPathVariantsCollection,
  TrainPathVariantPoint,
  TrainPathVariantPointsCollection,
  TrainPathVariantDate,
  TrainPathVariantDatesCollection,
  TripOrVariantSection,
  TripOrVariantSectionsCollection,
  BoundingBox,
  DataFile,
  DataFilesCollection,
  AdjacentLink,
  NetworkMap,
  NetworkMapsCollection,
  NetworkNode,
  NetworkNodesCollection,
  NetworkEdge,
  NetworkEdgesCollection,
  Network,
  NetworksCollection,
  NetworkSection,
  NetworkSectionsCollection,
  PassengerLoadTrip,
  PassengerLoadTripsCollection,
  PassengerLoadVersion,
  PassengerLoadVersionsCollection,
  CirculationDay,
  CirculationDaysCollection,
  CirculationPeriod,
  CirculationPeriodsCollection,
  CirculationPlan,
  CirculationPlansCollection,
  CirculationPlanVehicleScheduleInfo,
  CirculationPlanVehicleScheduleInfosCollection,
} from "./rawIndex";

export declare const entityConstructorByEntityClassKey: {
  Booking: typeof Booking;
  BookingsCollection: typeof BookingsCollection;
  RouteVersion: typeof RouteVersion;
  RouteVersionsCollection: typeof RouteVersionsCollection;
  Route: typeof Route;
  RoutesCollection: typeof RoutesCollection;
  Variant: typeof Variant;
  VariantsCollection: typeof VariantsCollection;
  VariantPoint: typeof VariantPoint;
  VariantPointsCollection: typeof VariantPointsCollection;
  VariantItinerary: typeof VariantItinerary;
  VariantItinerariesCollection: typeof VariantItinerariesCollection;
  ItinerarySegment: typeof ItinerarySegment;
  ItinerarySegmentsCollection: typeof ItinerarySegmentsCollection;
  VehicleSchedule: typeof VehicleSchedule;
  VehicleScheduleOrRouteVersion: typeof VehicleScheduleOrRouteVersion;
  Trip: typeof Trip;
  TripPoint: typeof TripPoint;
  TripOrVariant: typeof TripOrVariant;
  TripOrVariantPoint: typeof TripOrVariantPoint;
  VehicleSchedulesCollection: typeof VehicleSchedulesCollection;
  TripsCollection: typeof TripsCollection;
  TripPointsCollection: typeof TripPointsCollection;
  Place: typeof Place;
  PlacesCollection: typeof PlacesCollection;
  Vscincloir: typeof Vscincloir;
  VscincloirsCollection: typeof VscincloirsCollection;
  NetworkEvent: typeof NetworkEvent;
  NetworkEventsCollection: typeof NetworkEventsCollection;
  VehicleUnit: typeof VehicleUnit;
  VehicleUnitsCollection: typeof VehicleUnitsCollection;
  Block: typeof Block;
  BlocksCollection: typeof BlocksCollection;
  Blkvehuoir: typeof Blkvehuoir;
  BlkvehuoirsCollection: typeof BlkvehuoirsCollection;
  BlockActivity: typeof BlockActivity;
  BlockActivitiesCollection: typeof BlockActivitiesCollection;
  VehicleStandby: typeof VehicleStandby;
  VehicleStandbysCollection: typeof VehicleStandbysCollection;
  Maintenance: typeof Maintenance;
  MaintenancesCollection: typeof MaintenancesCollection;
  TripTp: typeof TripTp;
  TripTpsCollection: typeof TripTpsCollection;
  Tripvehgrpspec: typeof Tripvehgrpspec;
  TripvehgrpspecsCollection: typeof TripvehgrpspecsCollection;
  TripShift: typeof TripShift;
  TripShiftsCollection: typeof TripShiftsCollection;
  ConsistChange: typeof ConsistChange;
  ConsistChangesCollection: typeof ConsistChangesCollection;
  OvernightLink: typeof OvernightLink;
  OvernightLinksCollection: typeof OvernightLinksCollection;
  RunTimeVersion: typeof RunTimeVersion;
  RunTimeVersionsCollection: typeof RunTimeVersionsCollection;
  RunTime: typeof RunTime;
  RunTimesCollection: typeof RunTimesCollection;
  PortionWorkingVersion: typeof PortionWorkingVersion;
  PortionWorkingVersionsCollection: typeof PortionWorkingVersionsCollection;
  PortionWorking: typeof PortionWorking;
  PortionWorkingsCollection: typeof PortionWorkingsCollection;
  LoadTime: typeof LoadTime;
  LoadTimesCollection: typeof LoadTimesCollection;
  VehicleTask: typeof VehicleTask;
  VehicleTasksCollection: typeof VehicleTasksCollection;
  BlockSection: typeof BlockSection;
  BlockSectionsCollection: typeof BlockSectionsCollection;
  BookingCalendar: typeof BookingCalendar;
  BookingCalendarsCollection: typeof BookingCalendarsCollection;
  BookingCalendarDate: typeof BookingCalendarDate;
  BookingCalendarDatesCollection: typeof BookingCalendarDatesCollection;
  SchedulingUnitRoute: typeof SchedulingUnitRoute;
  SchedulingUnitRoutesCollection: typeof SchedulingUnitRoutesCollection;
  SchedulingUnitDate: typeof SchedulingUnitDate;
  SchedulingUnitDatesCollection: typeof SchedulingUnitDatesCollection;
  ServiceContext: typeof ServiceContext;
  ServiceContextsCollection: typeof ServiceContextsCollection;
  ServiceContextDay: typeof ServiceContextDay;
  ServiceContextDaysCollection: typeof ServiceContextDaysCollection;
  ServiceContextInterval: typeof ServiceContextInterval;
  ServiceContextIntervalsCollection: typeof ServiceContextIntervalsCollection;
  ServiceContextParent: typeof ServiceContextParent;
  ServiceContextParentsCollection: typeof ServiceContextParentsCollection;
  ServiceContextWeek: typeof ServiceContextWeek;
  ServiceContextWeeksCollection: typeof ServiceContextWeeksCollection;
  ServiceEvolution: typeof ServiceEvolution;
  ServiceEvolutionsCollection: typeof ServiceEvolutionsCollection;
  ServiceEvolutionPeriod: typeof ServiceEvolutionPeriod;
  ServiceEvolutionPeriodsCollection: typeof ServiceEvolutionPeriodsCollection;
  ServiceEvolutionPeriodSchedulesBooking: typeof ServiceEvolutionPeriodSchedulesBooking;
  ServiceEvolutionPeriodSchedulesBookingsCollection: typeof ServiceEvolutionPeriodSchedulesBookingsCollection;
  ServiceDefinition: typeof ServiceDefinition;
  ServiceDefinitionsCollection: typeof ServiceDefinitionsCollection;
  SdefSchedulingUnit: typeof SdefSchedulingUnit;
  SdefSchedulingUnitsCollection: typeof SdefSchedulingUnitsCollection;
  SchedulingUnit: typeof SchedulingUnit;
  SchedulingUnitsCollection: typeof SchedulingUnitsCollection;
  TrainPath: typeof TrainPath;
  TrainPathsGeneralInfo: typeof TrainPathsGeneralInfo;
  TrainPathsCollection: typeof TrainPathsCollection;
  TrainPathVariant: typeof TrainPathVariant;
  TrainPathVariantsCollection: typeof TrainPathVariantsCollection;
  TrainPathVariantPoint: typeof TrainPathVariantPoint;
  TrainPathVariantPointsCollection: typeof TrainPathVariantPointsCollection;
  TrainPathVariantDate: typeof TrainPathVariantDate;
  TrainPathVariantDatesCollection: typeof TrainPathVariantDatesCollection;
  TripOrVariantSection: typeof TripOrVariantSection;
  TripOrVariantSectionsCollection: typeof TripOrVariantSectionsCollection;
  BoundingBox: typeof BoundingBox;
  DataFile: typeof DataFile;
  DataFilesCollection: typeof DataFilesCollection;
  AdjacentLink: typeof AdjacentLink;
  NetworkMap: typeof NetworkMap;
  NetworkMapsCollection: typeof NetworkMapsCollection;
  NetworkNode: typeof NetworkNode;
  NetworkNodesCollection: typeof NetworkNodesCollection;
  NetworkEdge: typeof NetworkEdge;
  NetworkEdgesCollection: typeof NetworkEdgesCollection;
  Network: typeof Network;
  NetworksCollection: typeof NetworksCollection;
  NetworkSection: typeof NetworkSection;
  NetworkSectionsCollection: typeof NetworkSectionsCollection;
  PassengerLoadTrip: typeof PassengerLoadTrip;
  PassengerLoadTripsCollection: typeof PassengerLoadTripsCollection;
  PassengerLoadVersion: typeof PassengerLoadVersion;
  PassengerLoadVersionsCollection: typeof PassengerLoadVersionsCollection;
  CirculationDay: typeof CirculationDay;
  CirculationDaysCollection:typeof CirculationDaysCollection;
  CirculationPeriod: typeof CirculationPeriod;
  CirculationPeriodsCollection: typeof CirculationPeriodsCollection;
  CirculationPlan: typeof CirculationPlan;
  CirculationPlansCollection: typeof CirculationPlansCollection;
  CirculationPlanVehicleScheduleInfo: typeof CirculationPlanVehicleScheduleInfo;
  CirculationPlanVehicleScheduleInfosCollection: typeof CirculationPlanVehicleScheduleInfosCollection;
};

export type EntityConstructorByEntityClassKey = typeof entityConstructorByEntityClassKey;
export declare const exportableEntityClassKeys: string[];
export declare const importableEntityClassKeys: string[];
export declare function resetAllEntitiesNextIds(nextId?: number | string): any;
