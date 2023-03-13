const { expect } = require('chai');
const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const jsonSerializedVsc1Path = require('@bimo/test-data-json-serialized-vsc-1');
const jsonSerializedVsc1bPath = require('@bimo/test-data-json-serialized-vsc-1b');
const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const { VehicleSchedule, VehicleUnit, VehicleTask, VehicleTasksCollection, Maintenance, Trip, ConsistChange } = require('..');

describe('Bimo :: Entities :: VehicleSchedule', () => {
  describe(`# get VehicleTasks`, () => {
    context(`Given a valid simple vsc, where blkNumber = blkIntNumber`, () => {
      /** @type {VehicleSchedule} */
      let vehicleSchedule;
      before(async () => {
        vehicleSchedule = await getTestEntity(dataPack.entities.VehicleSchedule, VehicleSchedule);
      });
      it(`is a VehicleTasksCollection`, () => {
        expect(vehicleSchedule.vehicleTasks).to.be.instanceOf(VehicleTasksCollection);
      });
      it(`has as many vtas as vehicle units in the vsc`, () => {
        expect(vehicleSchedule.vehicleTasks.count()).to.equal(vehicleSchedule.vehicleUnits.count());
      });
      it(`has vtas that are properly formed`, () => {
        /** @type {VehicleTask} */
        const vta = vehicleSchedule.vehicleTasks.getByPropName('label', 'xkcdG19');

        expect(vta).to.be.instanceOf(VehicleTask);
        expect(vta.blocks.count()).to.equal(3);
        expect(vta.blockActivities.count()).to.equal(42);

        /** @type {Maintenance} */
        const firstBaItem = vta.blockActivities.first.activityEntityItem;
        expect(firstBaItem).to.be.instanceOf(Maintenance);
        expect(firstBaItem.mtnInternalNumber).to.equal('22');

        /** @type {Trip} */
        const lastBaItem = vta.blockActivities.last.activityEntityItem;
        expect(lastBaItem).to.be.instanceOf(Trip);
        expect(lastBaItem.trpIntNumber).to.equal('193');
      });
    });
    context(`Given a vsc where blkNumber <> blkIntNumber and some blkNumber are duplicated, but cchgRelatedBlockIntNo and cchgOntrpBlockIntNo have been added`, () => {
      /** @type {VehicleSchedule} */
      let vehicleSchedule;
      before(async () => {
        vehicleSchedule = await getTestEntity(jsonSerializedVsc1bPath, VehicleSchedule);
      });
      it(`is a VehicleTasksCollection`, () => {
        expect(vehicleSchedule.vehicleTasks).to.be.instanceOf(VehicleTasksCollection);
      });
      it(`has as many vtas as vehicle units in the vsc`, () => {
        expect(vehicleSchedule.vehicleTasks.count()).to.equal(vehicleSchedule.vehicleUnits.count());
      });
      it(`has vtas that are properly formed (1/2)`, () => {
        /** @type {VehicleTask} */
        const vta = vehicleSchedule.vehicleTasks.getByPropName('label', 'GMClvhGb');

        expect(vta).to.be.instanceOf(VehicleTask);
        expect(vta.blocks.count()).to.equal(5);
        expect(vta.blockActivities.count()).to.equal(30);

        /** @type {Maintenance} */
        const firstBaItem = vta.blockActivities.first.activityEntityItem;
        expect(firstBaItem).to.be.instanceOf(Maintenance);
        expect(firstBaItem.mtnInternalNumber).to.equal('30426');

        /** @type {ConsistChange} */
        const lastBaItem = vta.blockActivities.last.activityEntityItem;
        expect(lastBaItem).to.be.instanceOf(ConsistChange);
        expect(lastBaItem.cchgInternalNumber).to.equal('93235');
      });
      it(`has vtas that are properly formed (2/2)`, () => {
        /** @type {VehicleTask} */
        const vta = vehicleSchedule.vehicleTasks.getByPropName('label', 'hqpf82tr');

        expect(vta).to.be.instanceOf(VehicleTask);
        expect(vta.blocks.count()).to.equal(4);
        expect(vta.blockActivities.count()).to.equal(21);

        /** @type {Maintenance} */
        const firstBaItem = vta.blockActivities.first.activityEntityItem;
        expect(firstBaItem).to.be.instanceOf(Maintenance);
        expect(firstBaItem.mtnInternalNumber).to.equal('30405');

        /** @type {Trip} */
        const lastBaItem = vta.blockActivities.last.activityEntityItem;
        expect(lastBaItem).to.be.instanceOf(Trip);
        expect(lastBaItem.trpIntNumber).to.equal('2416043');
      });
    });
    context(`Given a vsc where blkNumber <> blkIntNumber and no blkNumber are duplicated`, () => {
      /** @type {VehicleSchedule} */
      let vehicleSchedule;
      before(async () => {
        vehicleSchedule = await getTestEntity(jsonSerializedVsc1Path, VehicleSchedule);
      });
      it(`is a VehicleTasksCollection`, () => {
        expect(vehicleSchedule.vehicleTasks).to.be.instanceOf(VehicleTasksCollection);
      });
      it(`has as many vtas as vehicle units in the vsc`, () => {
        expect(vehicleSchedule.vehicleTasks.count()).to.equal(vehicleSchedule.vehicleUnits.count());
      });
      it(`has vtas that are properly formed (1/2)`, () => {
        /** @type {VehicleTask} */
        const vta = vehicleSchedule.vehicleTasks.getByPropName('label', 'GMClvhGb');

        expect(vta).to.be.instanceOf(VehicleTask);
        expect(vta.blocks.count()).to.equal(5);
        expect(vta.blockActivities.count()).to.equal(30);

        /** @type {Maintenance} */
        const firstBaItem = vta.blockActivities.first.activityEntityItem;
        expect(firstBaItem).to.be.instanceOf(Maintenance);
        expect(firstBaItem.mtnInternalNumber).to.equal('30426');

        /** @type {ConsistChange} */
        const lastBaItem = vta.blockActivities.last.activityEntityItem;
        expect(lastBaItem).to.be.instanceOf(ConsistChange);
        expect(lastBaItem.cchgInternalNumber).to.equal('94100');
      });
      it(`has vtas that are properly formed (2/2)`, () => {
        /** @type {VehicleTask} */
        const vta = vehicleSchedule.vehicleTasks.getByPropName('label', 'hqpf82tr');

        expect(vta).to.be.instanceOf(VehicleTask);
        expect(vta.blocks.count()).to.equal(4);
        expect(vta.blockActivities.count()).to.equal(21);

        /** @type {Maintenance} */
        const firstBaItem = vta.blockActivities.first.activityEntityItem;
        expect(firstBaItem).to.be.instanceOf(Maintenance);
        expect(firstBaItem.mtnInternalNumber).to.equal('30405');

        /** @type {Trip} */
        const lastBaItem = vta.blockActivities.last.activityEntityItem;
        expect(lastBaItem).to.be.instanceOf(Trip);
        expect(lastBaItem.trpIntNumber).to.equal('2468184');
      });
    });
  });
});
