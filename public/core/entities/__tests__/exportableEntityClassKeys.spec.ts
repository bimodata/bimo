/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const { exportableEntityClassKeys } = require('..');

describe('exportableEntityClassKeys', () => {
  it(`is an array of all exportable entityClassKeys`, () => {
    expect(exportableEntityClassKeys).to.eql([
      'BookingsCollection',
      'RouteVersionsCollection',
      'VehicleSchedulesCollection',
      'PlacesCollection',
      'RunTimeVersionsCollection',
    ]);
  });
});
