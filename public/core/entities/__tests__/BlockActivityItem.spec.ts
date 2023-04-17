const { expect } = require('chai');

const { Item } = require('@bimo/core-utils-collection');
const { BlockActivityItem, VehicleSchedule, Trip } = require('..');

class TestClass1 extends BlockActivityItem(Item, { blkActIdPropName: 'blkactTripNo', itemIdPropName: 'trpIntNumber' }) {
  constructor(props) {
    super(props);
    this.trpIntNumber = props.trpIntNumber;
    this.parent = { parent: props.vehicleSchedule ?? new VehicleSchedule({}) };
  }
}

describe('Bimo :: Entities :: BlockActivityItem', () => {
  it(`allows extending a class and mixing it with an other`, () => {
    const item1 = new TestClass1({ trpIntNumber: 1 });
    expect(item1).to.be.instanceOf(Item);
    expect(item1.customProps).to.eql({});

    // Right now instanceOf doesn't work on mixins but it's possible to make it
    // work using https://www.npmjs.com/package/mixwith
    // expect(item1).to.be.instanceOf(BlockActivityItem);
    expect(item1.constructor.itemIdPropName).to.equal('trpIntNumber');
  });

  describe(`get and set blockActivity`, () => {
    it('throws an error if the item has no vehicleSchedule', () => {
      const item1 = new TestClass1({ trpIntNumber: 1, vehicleSchedule: false });
      expect(() => item1.blockActivity).to.throw('An item must have a vehicleSchedule when its blockActivities are accessed');
    });
    it('is null if not available', () => {
      const item1 = new TestClass1({ trpIntNumber: 1 });
      expect(item1.blockActivity).to.equal(null);
    });
    it('throws an error when trying to manually set a block activity', () => {
      const item1 = new TestClass1({ trpIntNumber: 1 });
      expect(() => {
        item1.blockActivity = 'toto';
      }).to.throw('BlockActivity should not be set manually. Use AddBlockActivity');
    });
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
  describe(`add and remove blockActivity`, () => {
    it('Works', () => {
      const item1 = new TestClass1({ trpIntNumber: 1 });
      const blkAct = { blkactTripNo: '2' };
      expect(item1.blockActivity).to.equal(null);
      item1.addBlockActivity(blkAct);
      expect(item1.blockActivity).to.equal(blkAct);
      item1.removeBlockActivity(blkAct);
      expect(item1.blockActivity).to.equal(null);
    });
  });
});
