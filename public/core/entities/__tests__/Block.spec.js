const { expect } = require('chai');
const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const { VehicleSchedule, Block, Trip } = require('..');

describe('Bimo :: Entities :: Block', () => {
  describe(`# sortBlockActivitiesByTime`, () => {
    let vehicleSchedule;
    beforeEach(async () => {
      vehicleSchedule = await getTestEntity(dataPack.entities.VehicleSchedule, VehicleSchedule);
    });

    context(`on a valid block where activities are not sorted correctly`, () => {
      const idOfBlockToUseForTest = '13';
      it(`sorts the block activities in ascending order of their start time`, () => {
        const block = vehicleSchedule.blocks.getById(idOfBlockToUseForTest);
        const blockActivityThatShouldMove = block.blockActivities.items[0];
        block.sortBlockActivitiesByTime();
        expect(block.blockActivities.items[0]).to.not.equal(blockActivityThatShouldMove);
        expect(block.blockActivities.items[8]).to.equal(blockActivityThatShouldMove);
      });
    });
  });
  describe(`# startTimeAsDuration and endTimeAsDuration`, () => {
    let vehicleSchedule;
    beforeEach(async () => {
      vehicleSchedule = await getTestEntity(dataPack.entities.VehicleSchedule, VehicleSchedule);
    });

    context(`on a valid block where activities are not sorted correctly`, () => {
      const idOfBlockToUseForTest = '13';
      it(`returns the start time of the first block activity`, () => {
        const block = vehicleSchedule.blocks.getById(idOfBlockToUseForTest);
        const blockStartTimeAsDuration = block.startTimeAsDuration;
        const blockEndTimeAsDuration = block.endTimeAsDuration;
        block.sortBlockActivitiesByTime();
        const firstBlockActivity = block.blockActivities.first;
        const lastBlockActivity = block.blockActivities.last;

        expect(blockStartTimeAsDuration).to.equal(firstBlockActivity.startTimeAsDuration);
        expect(blockEndTimeAsDuration).to.equal(lastBlockActivity.endTimeAsDuration);
      });
    });
  });

  describe(`# addTrip and remove trip`, () => {
    let block;
    let trip;
    beforeEach(() => {
      const vsc = new VehicleSchedule({});
      block = vsc.blocks.createNewItem({});
      trip = vsc.trips.createNewItem({ trpIntNumber: '123' });
    });
    it(`adds the trip to the block as a block activity, then removes it`, () => {
      expect(block.blockActivities.count()).to.equal(0);
      block.addTrip(trip);
      expect(block.blockActivities.count()).to.equal(1);
      expect(block.blockActivities.first.blkactTripNo).to.equal(trip.trpIntNumber);
      block.removeTrip(trip);
      expect(block.blockActivities.count()).to.equal(0);
    });
    it(`makes the blockActivity and the block available from the trip (then unavailable)`, () => {
      expect(trip.block).to.equal(null);
      expect(trip.blockActivity).to.equal(null);
      block.addTrip(trip);
      expect(trip.block).to.equal(block);
      expect(trip.blockActivity.blkactTripNo).to.equal(trip.trpIntNumber);
      block.removeTrip(trip);
      expect(trip.block).to.equal(null);
      expect(trip.blockActivity).to.equal(null);
    });
  });
});
