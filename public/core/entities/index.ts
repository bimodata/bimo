import resetAllEntitiesNextIds from "@bimo/core-utils-reset-all-entities-next-ids";
import { Entity } from "@bimo/core-utils-entity";

const entityConstructorByEntityClassKey: { [key: string]: Entity } = {};

// entityConstructorByEntityClassKey.Booking = require("./src/Booking");
// entityConstructorByEntityClassKey.BookingsCollection = require("./src/BookingsCollection");
// entityConstructorByEntityClassKey.RouteVersion = require("./src/RouteVersion");
// entityConstructorByEntityClassKey.RouteVersionsCollection = require("./src/RouteVersionsCollection");
// entityConstructorByEntityClassKey.Route = require("./src/Route");
// entityConstructorByEntityClassKey.Variant = require("./src/Variant");
// entityConstructorByEntityClassKey.VariantsCollection = require("./src/VariantsCollection");
// entityConstructorByEntityClassKey.VariantPoint = require("./src/VariantPoint");
// entityConstructorByEntityClassKey.VariantPointsCollection = require("./src/VariantPointsCollection");
// entityConstructorByEntityClassKey.VehicleSchedule = require("./src/VehicleSchedule");
// entityConstructorByEntityClassKey.VehicleScheduleOrRouteVersion = require("./src/VehicleScheduleOrRouteVersion");
// entityConstructorByEntityClassKey.Trip = require("./src/Trip");
// entityConstructorByEntityClassKey.TripPoint = require("./src/TripPoint");
// entityConstructorByEntityClassKey.TripOrVariant = require("./src/TripOrVariant");
// entityConstructorByEntityClassKey.TripOrVariantPoint = require("./src/TripOrVariantPoint");
// entityConstructorByEntityClassKey.VehicleSchedulesCollection = require("./src/VehicleSchedulesCollection");
// entityConstructorByEntityClassKey.TripsCollection = require("./src/TripsCollection");
// entityConstructorByEntityClassKey.TripPointsCollection = require("./src/TripPointsCollection");
// entityConstructorByEntityClassKey.Place = require("./src/Place");
// entityConstructorByEntityClassKey.PlacesCollection = require("./src/PlacesCollection");
// entityConstructorByEntityClassKey.Vscincloir = require("./src/Vscincloir");
// entityConstructorByEntityClassKey.VscincloirsCollection = require("./src/VscincloirsCollection");
// entityConstructorByEntityClassKey.NetworkEvent = require("./src/NetworkEvent");
// entityConstructorByEntityClassKey.NetworkEventsCollection = require("./src/NetworkEventsCollection");
// entityConstructorByEntityClassKey.VehicleUnit = require("./src/VehicleUnit");
// entityConstructorByEntityClassKey.VehicleUnitsCollection = require("./src/VehicleUnitsCollection");
// entityConstructorByEntityClassKey.Block = require("./src/Block");
// entityConstructorByEntityClassKey.BlocksCollection = require("./src/BlocksCollection");
// entityConstructorByEntityClassKey.Blkvehuoir = require("./src/Blkvehuoir");
// entityConstructorByEntityClassKey.BlkvehuoirsCollection = require("./src/BlkvehuoirsCollection");
// entityConstructorByEntityClassKey.BlockActivity = require("./src/BlockActivity");
// entityConstructorByEntityClassKey.BlockActivityItem = require("./src/BlockActivityItem");
// entityConstructorByEntityClassKey.BlockActivitiesCollection = require("./src/BlockActivitiesCollection");
// entityConstructorByEntityClassKey.VehicleStandby = require("./src/VehicleStandby");
// entityConstructorByEntityClassKey.VehicleStandbysCollection = require("./src/VehicleStandbysCollection");
// entityConstructorByEntityClassKey.Maintenance = require("./src/Maintenance");
// entityConstructorByEntityClassKey.MaintenancesCollection = require("./src/MaintenancesCollection");
// entityConstructorByEntityClassKey.TripTp = require("./src/TripTp");
// entityConstructorByEntityClassKey.TripTpsCollection = require("./src/TripTpsCollection");
// entityConstructorByEntityClassKey.Tripvehgrpspec = require("./src/Tripvehgrpspec");
// entityConstructorByEntityClassKey.TripvehgrpspecsCollection = require("./src/TripvehgrpspecsCollection");
// entityConstructorByEntityClassKey.TripShift = require("./src/TripShift");
// entityConstructorByEntityClassKey.TripShiftsCollection = require("./src/TripShiftsCollection");
// entityConstructorByEntityClassKey.ConsistChange = require("./src/ConsistChange");
// entityConstructorByEntityClassKey.ConsistChangesCollection = require("./src/ConsistChangesCollection");
// entityConstructorByEntityClassKey.OvernightLink = require("./src/OvernightLink");
// entityConstructorByEntityClassKey.OvernightLinksCollection = require("./src/OvernightLinksCollection");
entityConstructorByEntityClassKey.RunTimeVersion = require("./src/RunTimeVersion");
entityConstructorByEntityClassKey.RunTimeVersionsCollection = require("./src/RunTimeVersionsCollection");
entityConstructorByEntityClassKey.RunTime = require("./src/RunTime");
entityConstructorByEntityClassKey.RunTimesCollection = require("./src/RunTimesCollection");
entityConstructorByEntityClassKey.LoadTime = require("./src/LoadTime");
entityConstructorByEntityClassKey.LoadTimesCollection = require("./src/LoadTimesCollection");
// entityConstructorByEntityClassKey.VehicleTask = require("./src/VehicleTask");
// entityConstructorByEntityClassKey.VehicleTasksCollection = require("./src/VehicleTasksCollection");
// entityConstructorByEntityClassKey.BlockSection = require("./src/BlockSection");
// entityConstructorByEntityClassKey.BlockSectionsCollection = require("./src/BlockSectionsCollection");
// entityConstructorByEntityClassKey.VehicleScheduleOrRouteVersion = require("./src/VehicleScheduleOrRouteVersion");

// entityConstructorByEntityClassKey.BookingCalendar = require("./src/BookingCalendar");
// entityConstructorByEntityClassKey.BookingCalendarsCollection = require("./src/BookingCalendarsCollection");
// entityConstructorByEntityClassKey.BookingCalendarDate = require("./src/BookingCalendarDate");
// entityConstructorByEntityClassKey.BookingCalendarDatesCollection = require("./src/BookingCalendarDatesCollection");
// entityConstructorByEntityClassKey.SchedulingUnitDate = require("./src/SchedulingUnitDate");
// entityConstructorByEntityClassKey.SchedulingUnitDatesCollection = require("./src/SchedulingUnitDatesCollection");
// entityConstructorByEntityClassKey.ServiceContext = require("./src/ServiceContext");
// entityConstructorByEntityClassKey.ServiceContextsCollection = require("./src/ServiceContextsCollection");
// entityConstructorByEntityClassKey.ServiceContextDay = require("./src/ServiceContextDay");
// entityConstructorByEntityClassKey.ServiceContextDaysCollection = require("./src/ServiceContextDaysCollection");
// entityConstructorByEntityClassKey.ServiceContextInterval = require("./src/ServiceContextInterval");
// entityConstructorByEntityClassKey.ServiceContextIntervalsCollection = require("./src/ServiceContextIntervalsCollection");
// entityConstructorByEntityClassKey.ServiceContextParent = require("./src/ServiceContextParent");
// entityConstructorByEntityClassKey.ServiceContextParentsCollection = require("./src/ServiceContextParentsCollection");
// entityConstructorByEntityClassKey.ServiceContextWeek = require("./src/ServiceContextWeek");
// entityConstructorByEntityClassKey.ServiceContextWeeksCollection = require("./src/ServiceContextWeeksCollection");
// entityConstructorByEntityClassKey.ServiceEvolution = require("./src/ServiceEvolution");
// entityConstructorByEntityClassKey.ServiceEvolutionsCollection = require("./src/ServiceEvolutionsCollection");
// entityConstructorByEntityClassKey.ServiceEvolutionPeriod = require("./src/ServiceEvolutionPeriod");
// entityConstructorByEntityClassKey.ServiceEvolutionPeriodsCollection = require("./src/ServiceEvolutionPeriodsCollection");
// entityConstructorByEntityClassKey.ServiceEvolutionPeriodSchedulesBooking = require("./src/ServiceEvolutionPeriodSchedulesBooking");
// entityConstructorByEntityClassKey.ServiceEvolutionPeriodSchedulesBookingsCollection = require("./src/ServiceEvolutionPeriodSchedulesBookingsCollection");
// entityConstructorByEntityClassKey.ServiceDefinition = require("./src/ServiceDefinition");
// entityConstructorByEntityClassKey.ServiceDefinitionsCollection = require("./src/ServiceDefinitionsCollection");
// entityConstructorByEntityClassKey.SdefSchedulingUnit = require("./src/SdefSchedulingUnit");
// entityConstructorByEntityClassKey.SdefSchedulingUnitsCollection = require("./src/SdefSchedulingUnitsCollection");
// entityConstructorByEntityClassKey.SchedulingUnit = require("./src/SchedulingUnit");
// entityConstructorByEntityClassKey.SchedulingUnitsCollection = require("./src/SchedulingUnitsCollection");
// entityConstructorByEntityClassKey.TrainPath = require("./src/TrainPath");
// entityConstructorByEntityClassKey.TrainPathsGeneralInfo = require("./src/TrainPathsGeneralInfo");
// entityConstructorByEntityClassKey.TrainPathsCollection = require("./src/TrainPathsCollection");
// entityConstructorByEntityClassKey.TrainPathVariant = require("./src/TrainPathVariant");
// entityConstructorByEntityClassKey.TrainPathVariantsCollection = require("./src/TrainPathVariantsCollection");
// entityConstructorByEntityClassKey.TrainPathVariantPoint = require("./src/TrainPathVariantPoint");
// entityConstructorByEntityClassKey.TrainPathVariantPointsCollection = require("./src/TrainPathVariantPointsCollection");
// entityConstructorByEntityClassKey.TrainPathVariantDate = require("./src/TrainPathVariantDate");
// entityConstructorByEntityClassKey.TrainPathVariantDatesCollection = require("./src/TrainPathVariantDatesCollection");
// entityConstructorByEntityClassKey.TripOrVariantSection = require("./src/TripOrVariantSection");
// entityConstructorByEntityClassKey.TripOrVariantSectionsCollection = require("./src/TripOrVariantSectionsCollection");

// entityConstructorByEntityClassKey.BoundingBox = require("./src/BoundingBox");
// entityConstructorByEntityClassKey.DataFile = require("./src/DataFile");
// entityConstructorByEntityClassKey.DataFilesCollection = require("./src/DataFilesCollection");
// entityConstructorByEntityClassKey.Jour = require("./src/Jour");
// entityConstructorByEntityClassKey.AdjacentLink = require("./src/AdjacentLink");
// entityConstructorByEntityClassKey.NetworkMap = require("./src/NetworkMap");
// entityConstructorByEntityClassKey.NetworkMapsCollection = require("./src/NetworkMapsCollection");
// entityConstructorByEntityClassKey.NetworkNode = require("./src/NetworkNode");
// entityConstructorByEntityClassKey.NetworkNodesCollection = require("./src/NetworkNodesCollection");
// entityConstructorByEntityClassKey.NetworkEdge = require("./src/NetworkEdge");
// entityConstructorByEntityClassKey.NetworkEdgesCollection = require("./src/NetworkEdgesCollection");
// entityConstructorByEntityClassKey.Network = require("./src/Network");
// entityConstructorByEntityClassKey.NetworksCollection = require("./src/NetworksCollection");
// entityConstructorByEntityClassKey.NetworkSection = require("./src/NetworkSection");
// entityConstructorByEntityClassKey.NetworkSectionsCollection = require("./src/NetworkSectionsCollection");

const exportableEntityClassKeys = Object.keys(entityConstructorByEntityClassKey).filter(
  (entityClassKey) =>
    //@ts-ignore
    entityConstructorByEntityClassKey[entityClassKey].defaultExportedDataDataName
);

const importableEntityClassKeys = Object.keys(entityConstructorByEntityClassKey).filter(
  (entityClassKey) =>
    //@ts-ignore
    entityConstructorByEntityClassKey[entityClassKey].defaultImportDataDataName
);

module.exports = {
  ...entityConstructorByEntityClassKey,
  exportableEntityClassKeys,
  importableEntityClassKeys,
  resetAllEntitiesNextIds: (nextId) =>
    resetAllEntitiesNextIds(entityConstructorByEntityClassKey, nextId),
};
