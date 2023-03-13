const resetAllEntitiesNextIds = require('@bimo/core-utils-reset-all-entities-next-ids');

const DefaultClassFactoryByEntityClassKey = {};

DefaultClassFactoryByEntityClassKey.BoundingBox = require('./src/BoundingBoxClassFactory');
DefaultClassFactoryByEntityClassKey.DataFile = require('./src/DataFileClassFactory');
DefaultClassFactoryByEntityClassKey.DataFilesCollection = require('./src/DataFilesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Jour = require('./src/JourClassFactory');

DefaultClassFactoryByEntityClassKey.TripOrVariantPoint = require('./src/TripOrVariantPointClassFactory');

DefaultClassFactoryByEntityClassKey.VariantPoint = require('./src/VariantPointClassFactory');
DefaultClassFactoryByEntityClassKey.VariantPointsCollection = require('./src/VariantPointsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.TripOrVariant = require('./src/TripOrVariantClassFactory');

DefaultClassFactoryByEntityClassKey.Variant = require('./src/VariantClassFactory');
DefaultClassFactoryByEntityClassKey.VariantsCollection = require('./src/VariantsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Route = require('./src/RouteClassFactory');
DefaultClassFactoryByEntityClassKey.RoutesCollection = require('./src/RoutesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.TripPoint = require('./src/TripPointClassFactory');
DefaultClassFactoryByEntityClassKey.TripPointsCollection = require('./src/TripPointsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.TripTp = require('./src/TripTpClassFactory');
DefaultClassFactoryByEntityClassKey.TripTpsCollection = require('./src/TripTpsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Tripvehgrpspec = require('./src/TripvehgrpspecClassFactory');
DefaultClassFactoryByEntityClassKey.TripvehgrpspecsCollection = require('./src/TripvehgrpspecsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.TripShift = require('./src/TripShiftClassFactory');
DefaultClassFactoryByEntityClassKey.TripShiftsCollection = require('./src/TripShiftsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.BlockActivity = require('./src/BlockActivityClassFactory');
DefaultClassFactoryByEntityClassKey.BlockActivityItemMixin = require('./src/BlockActivityItemMixinFactory');
DefaultClassFactoryByEntityClassKey.BlockActivitiesCollection = require('./src/BlockActivitiesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.Trip = require('./src/TripClassFactory');
DefaultClassFactoryByEntityClassKey.TripsCollection = require('./src/TripsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.Blkvehuoir = require('./src/BlkvehuoirClassFactory');
DefaultClassFactoryByEntityClassKey.BlkvehuoirsCollection = require('./src/BlkvehuoirsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.Block = require('./src/BlockClassFactory');
DefaultClassFactoryByEntityClassKey.BlocksCollection = require('./src/BlocksCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.NetworkEvent = require('./src/NetworkEventClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkEventsCollection = require('./src/NetworkEventsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.VehicleUnit = require('./src/VehicleUnitClassFactory');
DefaultClassFactoryByEntityClassKey.VehicleUnitsCollection = require('./src/VehicleUnitsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.VehicleStandby = require('./src/VehicleStandbyClassFactory');
DefaultClassFactoryByEntityClassKey.VehicleStandbysCollection = require('./src/VehicleStandbysCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Maintenance = require('./src/MaintenanceClassFactory');
DefaultClassFactoryByEntityClassKey.MaintenancesCollection = require('./src/MaintenancesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.ConsistChange = require('./src/ConsistChangeClassFactory');
DefaultClassFactoryByEntityClassKey.ConsistChangesCollection = require('./src/ConsistChangesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.OvernightLink = require('./src/OvernightLinkClassFactory');
DefaultClassFactoryByEntityClassKey.OvernightLinksCollection = require('./src/OvernightLinksCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.VehicleScheduleOrRouteVersion = require('./src/VehicleScheduleOrRouteVersionClassFactory');
DefaultClassFactoryByEntityClassKey.RouteVersion = require('./src/RouteVersionClassFactory');
DefaultClassFactoryByEntityClassKey.RouteVersionsCollection = require('./src/RouteVersionsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Vscincloir = require('./src/VscincloirClassFactory');
DefaultClassFactoryByEntityClassKey.VscincloirsCollection = require('./src/VscincloirsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.VehicleTask = require('./src/VehicleTaskClassFactory');
DefaultClassFactoryByEntityClassKey.VehicleTasksCollection = require('./src/VehicleTasksCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.BlockSection = require('./src/BlockSectionClassFactory');
DefaultClassFactoryByEntityClassKey.BlockSectionsCollection = require('./src/BlockSectionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.VehicleSchedule = require('./src/VehicleScheduleClassFactory');
DefaultClassFactoryByEntityClassKey.VehicleSchedulesCollection = require('./src/VehicleSchedulesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.RunTime = require('./src/RunTimeClassFactory');
DefaultClassFactoryByEntityClassKey.RunTimesCollection = require('./src/RunTimesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.LoadTime = require('./src/LoadTimeClassFactory');
DefaultClassFactoryByEntityClassKey.LoadTimesCollection = require('./src/LoadTimesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.RunTimeVersion = require('./src/RunTimeVersionClassFactory');
DefaultClassFactoryByEntityClassKey.RunTimeVersionsCollection = require('./src/RunTimeVersionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.Booking = require('./src/BookingClassFactory');
DefaultClassFactoryByEntityClassKey.BookingsCollection = require('./src/BookingsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Place = require('./src/PlaceClassFactory');
DefaultClassFactoryByEntityClassKey.PlacesCollection = require('./src/PlacesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.SchedulingUnitDate = require('./src/SchedulingUnitDateClassFactory');
DefaultClassFactoryByEntityClassKey.SchedulingUnitDatesCollection = require('./src/SchedulingUnitDatesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.BookingCalendarDate = require('./src/BookingCalendarDateClassFactory');
DefaultClassFactoryByEntityClassKey.BookingCalendarDatesCollection = require('./src/BookingCalendarDatesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.ServiceContextDay = require('./src/ServiceContextDayClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextDaysCollection = require('./src/ServiceContextDaysCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextInterval = require('./src/ServiceContextIntervalClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextIntervalsCollection = require('./src/ServiceContextIntervalsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextParent = require('./src/ServiceContextParentClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextParentsCollection = require('./src/ServiceContextParentsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextWeek = require('./src/ServiceContextWeekClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextWeeksCollection = require('./src/ServiceContextWeeksCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.ServiceEvolutionPeriodSchedulesBooking = require(
  './src/ServiceEvolutionPeriodSchedulesBookingClassFactory',
);
DefaultClassFactoryByEntityClassKey.ServiceEvolutionPeriodSchedulesBookingsCollection = require(
  './src/ServiceEvolutionPeriodSchedulesBookingsCollectionClassFactory',
);

DefaultClassFactoryByEntityClassKey.ServiceEvolutionPeriod = require('./src/ServiceEvolutionPeriodClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceEvolutionPeriodsCollection = require('./src/ServiceEvolutionPeriodsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.ServiceContext = require('./src/ServiceContextClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceContextsCollection = require('./src/ServiceContextsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.ServiceEvolution = require('./src/ServiceEvolutionClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceEvolutionsCollection = require('./src/ServiceEvolutionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.BookingCalendar = require('./src/BookingCalendarClassFactory');

DefaultClassFactoryByEntityClassKey.SchedulingUnitRoute = require('./src/SchedulingUnitRouteClassFactory');
DefaultClassFactoryByEntityClassKey.SchedulingUnitRoutesCollection = require('./src/SchedulingUnitRoutesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.SchedulingUnit = require('./src/SchedulingUnitClassFactory');
DefaultClassFactoryByEntityClassKey.SchedulingUnitsCollection = require('./src/SchedulingUnitsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.SdefSchedulingUnit = require('./src/SdefSchedulingUnitClassFactory');
DefaultClassFactoryByEntityClassKey.SdefSchedulingUnitsCollection = require('./src/SdefSchedulingUnitsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.ServiceDefinition = require('./src/ServiceDefinitionClassFactory');
DefaultClassFactoryByEntityClassKey.ServiceDefinitionsCollection = require('./src/ServiceDefinitionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.TrainPathVariantPoint = require('./src/TrainPathVariantPointClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathVariantPointsCollection = require('./src/TrainPathVariantPointsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathVariantDate = require('./src/TrainPathVariantDateClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathVariantDatesCollection = require('./src/TrainPathVariantDatesCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.TrainPathVariant = require('./src/TrainPathVariantClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathVariantsCollection = require('./src/TrainPathVariantsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathsGeneralInfo = require('./src/TrainPathsGeneralInfoClassFactory');

DefaultClassFactoryByEntityClassKey.TrainPath = require('./src/TrainPathClassFactory');
DefaultClassFactoryByEntityClassKey.TrainPathsCollection = require('./src/TrainPathsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.BookingCalendarsCollection = require('./src/BookingCalendarsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.TripOrVariantSection = require('./src/TripOrVariantSectionClassFactory');
DefaultClassFactoryByEntityClassKey.TripOrVariantSectionsCollection = require('./src/TripOrVariantSectionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.NetworkNode = require('./src/NetworkNodeClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkNodesCollection = require('./src/NetworkNodesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkEdge = require('./src/NetworkEdgeClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkEdgesCollection = require('./src/NetworkEdgesCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkSection = require('./src/NetworkSectionClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkSectionsCollection = require('./src/NetworkSectionsCollectionClassFactory');

DefaultClassFactoryByEntityClassKey.AdjacentLink = require('./src/AdjacentLinkClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkMap = require('./src/NetworkMapClassFactory');
DefaultClassFactoryByEntityClassKey.NetworkMapsCollection = require('./src/NetworkMapsCollectionClassFactory');
DefaultClassFactoryByEntityClassKey.Network = require('./src/NetworkClassFactory');
DefaultClassFactoryByEntityClassKey.NetworksCollection = require('./src/NetworksCollectionClassFactory');

function generateEntityConstructorByEntityClassKey({ CustomClassFactoryByEntityClassKey = {} } = {}) {
  const entityConstructorByEntityClassKey = {};

  Object.entries(DefaultClassFactoryByEntityClassKey).forEach(([entityClassKey, DefaultClassFactory]) => {
    const ClassFactory = CustomClassFactoryByEntityClassKey[entityClassKey] ?? DefaultClassFactory;
    entityConstructorByEntityClassKey[entityClassKey] = ClassFactory(entityConstructorByEntityClassKey);
  });

  return entityConstructorByEntityClassKey;
}

const entityConstructorByEntityClassKey = generateEntityConstructorByEntityClassKey();

const exportableEntityClassKeys = Object.keys(entityConstructorByEntityClassKey)
  .filter((entityClassKey) => entityConstructorByEntityClassKey[entityClassKey].defaultExportedDataDataName);

const importableEntityClassKeys = Object.keys(entityConstructorByEntityClassKey)
  .filter((entityClassKey) => entityConstructorByEntityClassKey[entityClassKey].defaultImportDataDataName);

module.exports = {
  generateEntityConstructorByEntityClassKey,
  ...entityConstructorByEntityClassKey,
  exportableEntityClassKeys,
  importableEntityClassKeys,
  resetAllEntitiesNextIds: (nextId) => resetAllEntitiesNextIds(entityConstructorByEntityClassKey, nextId),
};
