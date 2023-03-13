const { Trip, Variant, PlacesCollection } = require('@bimo/core-entities');
const deepFreeze = require('deep-freeze-es6');

module.exports = () => {
  let placesCollection = new PlacesCollection({
    items: [
      { plcIdentifier: 'A' },
      { plcIdentifier: 'B' },
      { plcIdentifier: 'C' },
      { plcIdentifier: 'D' },
      { plcIdentifier: 'E' },
      { plcIdentifier: 'A1', plcReferencePlace: 'A', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '20' },
      { plcIdentifier: 'A2', plcReferencePlace: 'A', locaLocMethod: '5', locaXCoord: '0', locaYCoord: '0' },
      { plcIdentifier: 'B1', plcReferencePlace: 'B', locaLocMethod: '5', locaXCoord: '-10', locaYCoord: '0' },
      { plcIdentifier: 'B2', plcReferencePlace: 'B', locaLocMethod: '5', locaXCoord: '0', locaYCoord: '-10' },
      { plcIdentifier: 'B3', plcReferencePlace: 'B', locaLocMethod: '5', locaXCoord: '10', locaYCoord: '0' },
      { plcIdentifier: 'B4', plcReferencePlace: 'B', locaLocMethod: '5', locaXCoord: '0', locaYCoord: '10' },
      { plcIdentifier: 'C1', plcReferencePlace: 'C', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
      { plcIdentifier: 'D1', plcReferencePlace: 'D', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
      { plcIdentifier: 'E1', plcReferencePlace: 'E', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
      { plcIdentifier: 'C2', plcReferencePlace: 'C', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
      { plcIdentifier: 'D2', plcReferencePlace: 'D', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
      { plcIdentifier: 'E2', plcReferencePlace: 'E', locaLocMethod: '5', locaXCoord: '20', locaYCoord: '14' },
    ],
  });
  // Force calculation of cached values
  const dummy = placesCollection.placesByReferencePlace;
  placesCollection = deepFreeze(placesCollection);

  return { placesCollection };
};
