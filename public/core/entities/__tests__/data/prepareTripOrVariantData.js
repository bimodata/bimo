const { Trip, Variant, PlacesCollection } = require('../..');

module.exports = () => {
  const tripA = () => {
    const trip = new Trip({
      tripPoints: [
        { trpptPlace: 'A', trpptIsTimingPoint: '1', trpptNoStopping: '0', trpptInternalDepartureTime: '07:00' },
        {
          trpptPlace: 'B',
          trpptIsTimingPoint: '0',
          trpptNoStopping: '1',
          trpptInternalArrivalTime: '07:05',
          trpptInternalDepartureTime: '07:05',
        },
        { trpptPlace: 'C', trpptIsTimingPoint: '1', trpptNoStopping: '1', trpptInternalArrivalTime: '07:15' },
        { trpptPlace: 'D', trpptIsTimingPoint: '0', trpptNoStopping: '0', trpptInternalArrivalTime: '07:20' },
        { trpptPlace: 'X', trpptIsTimingPoint: '1', trpptNoStopping: '0', trpptInternalArrivalTime: '07:25' },
        { trpptPlace: 'Z', trpptIsTimingPoint: '1', trpptNoStopping: '0', trpptInternalArrivalTime: '07:30' },
      ],
    });
    trip.setStartAndEndAttributesFromPoints();
    return trip;
  };
  const tripB = () => {
    const trip = new Trip({
      tripPoints: [
        { trpptPlace: 'A', trpptIsTimingPoint: '1', trpptNoStopping: '0', trpptInternalDepartureTime: '07:00' },
        {
          trpptPlace: 'I',
          trpptIsTimingPoint: '0',
          trpptNoStopping: '1',
          trpptInternalArrivalTime: '07:05',
          trpptInternalDepartureTime: '07:05',
        },
        { trpptPlace: 'J', trpptIsTimingPoint: '1', trpptNoStopping: '1', trpptInternalArrivalTime: '07:15' },
        { trpptPlace: 'K', trpptIsTimingPoint: '0', trpptNoStopping: '0', trpptInternalArrivalTime: '07:20' },
        { trpptPlace: 'Z', trpptIsTimingPoint: '1', trpptNoStopping: '0', trpptInternalArrivalTime: '07:30' },
      ],
    });
    trip.setStartAndEndAttributesFromPoints();
    return trip;
  };
  const variantA = () => new Variant({
    variantPoints: [
      { varptPlace: 'A', varptIsTimingPoint: '1', varptNoStopping: '0' },
      { varptPlace: 'B', varptIsTimingPoint: '0', varptNoStopping: '1' },
      { varptPlace: 'C', varptIsTimingPoint: '1', varptNoStopping: '1' },
      { varptPlace: 'D', varptIsTimingPoint: '0', varptNoStopping: '0' },
      { varptPlace: 'Z', varptIsTimingPoint: '1', varptNoStopping: '0' },
    ],
  });
  const variantB = () => new Variant({
    variantPoints: [
      { varptPlace: 'A', varptIsTimingPoint: '1', varptNoStopping: '0' },
      { varptPlace: 'I', varptIsTimingPoint: '0', varptNoStopping: '1' },
      { varptPlace: 'J', varptIsTimingPoint: '1', varptNoStopping: '1' },
      { varptPlace: 'K', varptIsTimingPoint: '0', varptNoStopping: '0' },
      { varptPlace: 'Z', varptIsTimingPoint: '1', varptNoStopping: '0' },
    ],
  });

  const placesCollection = () => new PlacesCollection({
    places: [
      { plcIdentifier: 'A' },
      { plcIdentifier: 'B' },
      { plcIdentifier: 'C' },
      { plcIdentifier: 'D' },
      { plcIdentifier: 'E' },
      { plcIdentifier: 'I' },
      { plcIdentifier: 'J' },
      { plcIdentifier: 'K' },
      { plcIdentifier: 'Z' },
      { plcIdentifier: 'A1', plcReferencePlace: 'A' },
      { plcIdentifier: 'B1', plcReferencePlace: 'B' },
      { plcIdentifier: 'C1', plcReferencePlace: 'C' },
      { plcIdentifier: 'D1', plcReferencePlace: 'D' },
      { plcIdentifier: 'E1', plcReferencePlace: 'E' },
    ],
  });

  return { tripA, tripB, variantA, variantB, placesCollection };
};
