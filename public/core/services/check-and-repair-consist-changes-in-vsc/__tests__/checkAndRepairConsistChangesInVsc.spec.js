const path = require('path');

const { expect } = require('chai');
const { VehicleSchedule, VehicleSchedulesCollection, resetAllEntitiesNextIds } = require('@bimo/core-entities');

const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const checkAndRepairConsistChangesInVsc = require('..');
const couplingIsInvalid = require('../src/couplingIsInvalid');
const unCouplingIsInvalid = require('../src/unCouplingIsInvalid');

/**
 *
 * @param {VehicleSchedule} vehicleSchedules
 * @param {*} config
 * @param {*} expectedResultPath
 * @param {*} bimoContext
 */
function testAll(vehicleSchedules, config, bimoContext) {
  /** @type {VehicleSchedule} */
  let result;
  const lengthByCollBefore = {};
  before(() => {
    lengthByCollBefore.trips = vehicleSchedules[0].trips.length;
    lengthByCollBefore.maintenances = vehicleSchedules[0].maintenances.length;
    lengthByCollBefore.vehicleStandbys = vehicleSchedules[0].vehicleStandbys.length;
    lengthByCollBefore.consistChanges = vehicleSchedules[0].consistChanges.length;
    result = checkAndRepairConsistChangesInVsc(vehicleSchedules[0], config, bimoContext);
  });
  it(`returns the original vsc`, () => {
    expect(result).to.equal(vehicleSchedules[0]);
  });
  describe(`the returned vehicle schedule:`, () => {
    it(`can have its blocks sorted by time`, () => {
      result.blocks.forEach((block) => {
        block.sortBlockActivitiesByTime();
      });
    });
    it(`has as many trips, maintenances, standbys and consist changes as the original`, () => {
      expect(result.trips.length).to.equal(lengthByCollBefore.trips);
      expect(result.maintenances.length).to.equal(lengthByCollBefore.maintenances);
      expect(result.vehicleStandbys.length).to.equal(lengthByCollBefore.vehicleStandbys);
      expect(result.consistChanges.length).to.equal(lengthByCollBefore.consistChanges);
    });
    it(`has as a 12 and 13 block activity for each dételage`, () => {
      result.consistChanges.pick((cchg) => cchg.cchgActivity === 'Dételage').forEach((cchg) => {
        expect(unCouplingIsInvalid(cchg)).to.equal(false);
      });
    });
    it(`has as a 14 and 15 block activity for each attelage`, () => {
      result.consistChanges.pick((cchg) => cchg.cchgActivity === 'Attelage').forEach((cchg) => {
        expect(couplingIsInvalid(cchg)).to.equal(false);
      });
    });
  });
}

const pathToTest1Data = path.join(__dirname, 'data', 'test1', 'vscColl1.json');

describe('checkAndRepairConsistChangesInVsc', () => {
  describe(`with test1 data`, () => {
    /** @type {VehicleSchedule[]} */ const vehicleSchedules = [];

    before(async () => {
      resetAllEntitiesNextIds();
      vehicleSchedules.push(...(await getTestEntity(pathToTest1Data, VehicleSchedulesCollection)).items);
    });

    describe(`With no config`, () => {
      const config = {};
      testAll(vehicleSchedules, config, { logger });
    });
  });
});
