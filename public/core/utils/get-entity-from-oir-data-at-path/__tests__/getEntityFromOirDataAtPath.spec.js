/* eslint-disable max-classes-per-file */
const path = require('path');
const { expect } = require('chai');

const { PlacesCollection, VehicleSchedulesCollection } = require('@bimo/core-entities');

const getEntityFromOirDataAtPath = require('..').getEntityFromOirDataAtPath;

describe('getEntityFromOirDataAtPath', () => {
  describe(`given valid place data and args`, () => {
    describe(`using all default options`, () => {
      let result;
      before(async () => {
        result = await getEntityFromOirDataAtPath(
          path.join(__dirname, 'data', 'places'),
          PlacesCollection,
        );
      });
      it(`returns a single entity of the expected type `, async () => {
        expect(result).to.be.instanceOf(PlacesCollection);
      });
      it(`loads data into the entities as expected`, async () => {
        expect(result.llo).to.eql(expectedLongString1);
      });
      it(`loads custom data into the entities as expected`, async () => {
        expect(result.items[0]._rawOirProps.customItem1).to.eql(`123`);
      });
    });
    describe(`using multipleEntitiesMode=true`, () => {
      let result;
      before(async () => {
        result = await getEntityFromOirDataAtPath(
          path.join(__dirname, 'data', 'places'),
          PlacesCollection,
          { multipleEntitiesMode: true },
        );
      });
      it(`returns an array of entities of the expected type `, async () => {
        expect(result).to.be.an('array').of.length(2);
        result.forEach((item) => {
          expect(item).to.be.instanceOf(PlacesCollection);
        });
      });
      it(`loads data into the entities as expected`, async () => {
        expect(result[1].llo).to.eql(expectedLongString2);
      });
    });
    describe(`using a custom dataFileMatcher`, () => {
      let result;
      before(async () => {
        result = await getEntityFromOirDataAtPath(
          path.join(__dirname, 'data', 'places'),
          PlacesCollection,
          {
            multipleEntitiesMode: true,
            dataFileMatcher: /\.customExtension$/,
          },
        );
      });
      it(`loads only the appropriate files`, async () => {
        expect(result).to.be.an('array').of.length(1);
        expect(result[0].items[0].plcIdentifier).to.equal('C1');
      });
    });
    describe(`using a custom dataFileMatcher that matches no files`, () => {
      it(`throws with a meaning full message`, async () => {
        let error;
        let result;
        try {
          result = await getEntityFromOirDataAtPath(
            path.join(__dirname, 'data', 'places'),
            PlacesCollection,
            {
              multipleEntitiesMode: true,
              dataFileMatcher: /\.csv$/,
            },
          );
        }
        catch (err) {
          error = err;
        }
        expect(result).to.equal(undefined);
        expect(error.message).to.equal(
          'Could not find a data file (/\\.csv$/) among place.oir,place1.txt,place2.txt,place3.customExtension',
        );
      });
    });
    describe(`using a custom controlFileMatcher that matches no files`, () => {
      it(`throws with a meaning full message`, async () => {
        let error;
        let result;
        try {
          result = await getEntityFromOirDataAtPath(
            path.join(__dirname, 'data', 'places'),
            PlacesCollection,
            {
              multipleEntitiesMode: true,
              controlFileMatcher: /\.blabla$/,
            },
          );
        }
        catch (err) {
          error = err;
        }
        expect(result).to.equal(undefined);
        expect(error.message).to.equal(
          'Could not find a control file (/\\.blabla$/) among place.oir,place1.txt,place2.txt,place3.customExtension',
        );
      });
    });
  });

  describe(`given valid vsc data and args`, () => {
    describe(`using all default options`, () => {
      let result;
      before(async () => {
        result = await getEntityFromOirDataAtPath(
          path.join(__dirname, 'data', 'vscs'),
          VehicleSchedulesCollection,
        );
      });
      it(`returns a single entity of the expected type `, async () => {
        expect(result).to.be.instanceOf(VehicleSchedulesCollection);
      });
      it(`loads data into the entities as expected`, async () => {
        result.tripsCollectionOfAllTripsOfAllVscs.forEach((trip) => trip.setStartAndEndAttributesFromPoints());
        expect(result.llo).to.eql(expectedLongString3);
        expect(result.items[0].trips.llo).to.eql(expectedLongString4);
      });
    });
  });
});

const expectedLongString1 = `A1 - Track A1 - 2 (45.3, 1.23)
A2 - Track A2 - 2 (45.3, 1.27)
A - Station A -  (, )`;

const expectedLongString2 = `B1 - Track B1 - 2 (45.3, 1.23)
B2 - Track B2 - 2 (45.3, 1.27)
B - Station B -  (, )`;

const expectedLongString3 = `1: vsc#1 - Example schedule 1 (04) | 4 trips | 0 blocks
2: vsc#2 - Example schedule 2 (04) | 4 trips | 0 blocks`;

const expectedLongString4 = `0-trip#1-routeA-undefined-undefined(placeA|07:00 → 08:00|placeD)[4]
0-trip#2-routeA-undefined-undefined(placeD|07:00 → 08:00|placeA)[4]
0-trip#3-routeB-undefined-undefined(placeX|09:00 → 10:00|placeZ)[3]
0-trip#4-routeB-undefined-undefined(placeZ|09:00 → 10:00|placeX)[3]`;
