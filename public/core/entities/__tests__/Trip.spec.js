const { expect } = require('chai');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const jsonVsc1Path = require('@bimo/test-data-json-serialized-vsc-1');
const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const { TripsCollection, VehicleSchedule, Trip, VehicleTask } = require('..');

describe('Bimo :: Entities :: Trip', () => {
  describe(`# copy`, () => {
    let tripsCollection;
    before(async () => {
      tripsCollection = await getTestEntity(dataPack.entities.TripsCollection, TripsCollection);
    });

    context('on a valid trip, when no new internalNumber is provided', () => {
      let originalTrip;
      let copiedTrip;
      before(async () => {
        [originalTrip] = tripsCollection.items;
        originalTrip.bimoId = 1;
        copiedTrip = originalTrip.copy();
      });

      it(`copied trip is a different instance`, () => {
        expect(copiedTrip).to.not.equal(originalTrip);
      });
      it(`copied trip has no parent`, () => {
        expect(copiedTrip.parent).to.equal(undefined);
      });
      it(`copied trip has a different trip points collection`, () => {
        expect(copiedTrip.tripPoints).to.not.equal(originalTrip.tripPoints);
      });
      it(`copied trip has different trip points`, () => {
        expect(copiedTrip.tripPoints.items).to.not.equal(originalTrip.tripPoints.items);
        expect(copiedTrip.tripPoints.items[0]).to.not.equal(originalTrip.tripPoints.items[0]);
      });
      it(`copied trip's bimo id = undefined`, () => {
        expect(!!originalTrip.bimoId).to.equal(true);
        expect(copiedTrip.bimoId).to.equal(undefined);
      });
      it(`copied trip's trippoints trip = copied trip`, () => {
        expect(copiedTrip.tripPoints.items[0].trip).to.equal(copiedTrip);
        expect(copiedTrip.firstPoint.trip === copiedTrip).to.equal(true);
      });
      it(`copied trip has a null internalNumber`, () => {
        // eslint-disable-next-line no-unused-expressions
        expect(copiedTrip.trpIntNumber).to.be.null;
      });
    });

    context('on a valid trip, when a new internalNumber is provided', () => {
      let originalTrip;
      let copiedTrip;
      before(async () => {
        [originalTrip] = tripsCollection.items;
        copiedTrip = originalTrip.copy(`1234`);
      });

      it(`copied trip is a different instance`, () => {
        expect(copiedTrip).to.not.equal(originalTrip);
      });
      it(`copied trip has no parent`, () => {
        expect(copiedTrip.parent).to.equal(undefined);
      });
      it(`copied trip has a different trip points collection`, () => {
        expect(copiedTrip.tripPoints).to.not.equal(originalTrip.tripPoints);
      });
      it(`copied trip has different trip points`, () => {
        expect(copiedTrip.tripPoints.items).to.not.equal(originalTrip.tripPoints.items);
        expect(copiedTrip.tripPoints.items[0]).to.not.equal(originalTrip.tripPoints.items[0]);
      });
      it(`copied trip has the new internalNumber`, () => {
        expect(copiedTrip.trpIntNumber).to.equal(`1234`);
      });
    });
  });

  describe(`# get vehicleTasks`, () => {
    context(`Given a trip from a valid complete vsc that has been loaded`, () => {
      it(`works`, async () => {
        /** @type {VehicleSchedule} */
        const vehicleSchedule = await getTestEntity(jsonVsc1Path, VehicleSchedule);

        /** @type {Trip} */
        const trip = vehicleSchedule.trips.items[0];
        expect(trip.vehicleTasks).to.be.an('array').of.length(2);
        const [vta1, vta2] = trip.vehicleTasks;
        expect(vta1).to.be.instanceOf(VehicleTask);
        expect(vta1.label).to.equal('CxdRRKGr');
        expect(vta2.label).to.equal('M4Akg07M');
      });
    });
  });
});
