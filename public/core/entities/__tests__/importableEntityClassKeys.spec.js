const { expect } = require('chai');

const { importableEntityClassKeys } = require('..');

describe('importableEntityClassKeys', () => {
  it(`is an array of all importable entityClassKeys`, () => {
    expect(importableEntityClassKeys).to.eql([
      'BookingsCollection',
      'RouteVersionsCollection',
      'VehicleSchedulesCollection',
      'PlacesCollection',
      'RunTimeVersionsCollection',
    ]);
  });
});
