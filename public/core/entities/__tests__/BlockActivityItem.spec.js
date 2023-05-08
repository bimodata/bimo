const { expect } = require('chai');
const { VehicleSchedule, Trip } = require('..');

describe('Bimo :: Entities :: BlockActivityItem', () => {
  describe(`get and set blockActivity`, () => {
    it('retrieves from the vehicle schedule when not manually set', () => {
      const vsc = new VehicleSchedule({});
      const trip = vsc.trips.createNewItem({ trpIntNumber: '1' });
      const block = vsc.blocks.createNewItem({});
      const blkAct = block.blockActivities.createNewItem({ blkactTripNo: '1' });
      expect(trip.blockActivity).to.equal(blkAct);
    });
    it(`Throws an error if there are inconsistencies`, () => {
      const vsc = new VehicleSchedule({});
      const trip = vsc.trips.createNewItem({ trpIntNumber: '1' });
      const block = vsc.blocks.createNewItem({});
      block.blockActivities.createNewItem({ blkactTripNo: '2' });
      expect(() => trip.blockActivity).to.throw(`Impossible de trouver un Voyage avec l'id 2 `);
    });
  });
});
