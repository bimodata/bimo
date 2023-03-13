const path = require('path');

const fullPackPath = path.join(__dirname, 'data');

module.exports = {
  fullPack: fullPackPath,
  entities: {
    Route: path.join(fullPackPath, 'Route.json'),
    RouteVersion: path.join(fullPackPath, 'RouteVersion.json'),
    RouteVersionsCollection: path.join(fullPackPath, 'RouteVersionsCollection.json'),
    RoutesCollection: path.join(fullPackPath, 'RoutesCollection.json'),
    TripsCollection: path.join(fullPackPath, 'TripsCollection.json'),
    Variant: path.join(fullPackPath, 'Variant.json'),
    VariantPoint: path.join(fullPackPath, 'VariantPoint.json'),
    VariantPointsCollection: path.join(fullPackPath, 'VariantPointsCollection.json'),
    VariantsCollection: path.join(fullPackPath, 'VariantsCollection.json'),
    VehicleSchedule: path.join(fullPackPath, 'VehicleSchedule.json'),
    VehicleSchedulesCollection: path.join(fullPackPath, 'VehicleSchedulesCollection.json'),
  },
  oirStyleData: {
    VehicleSchedulesCollection: path.join(fullPackPath, 'OirStyleVehicleSchedulesCollection.json'),
    RouteVersionsCollection: path.join(fullPackPath, 'OirStyleRouteVersionsCollection.json'),
  },
};
