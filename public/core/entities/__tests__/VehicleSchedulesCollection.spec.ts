const { expect } = require('chai');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const jsonSerializedVscColl1path = require('@bimo/test-data-json-serialized-vsc-collection-1');
const { getJsonAtPath, getTestEntity } = require('@bimo/test-utils-get-test-data');

const checkAndRepairConsistChangesInVsc = require('@bimo/core-services-check-and-repair-consist-changes-in-vsc');

const { VehicleSchedulesCollection, Trip, TripPoint, resetAllEntitiesNextIds, VehicleSchedule, VehicleTasksCollection } = require('..');

describe('Domain :: VehicleSchedulesCollection', () => {
  describe('#createFromOirStyleData', function testSuite() {
    this.timeout(5000);
    context('given oirStyleData about a vehicleSchedulesCollection', () => {
      /** @type {VehicleSchedulesCollection} */
      let newVehicleSchedulesCollection;
      let oirStyleData;
      before(async () => {
        resetAllEntitiesNextIds();
        oirStyleData = await getJsonAtPath(dataPack.oirStyleData.VehicleSchedulesCollection);
        newVehicleSchedulesCollection = VehicleSchedulesCollection.createFromOirStyleData(oirStyleData, 'Données de test');
      });
      it('returns a VehicleSchedulesCollection', () => {
        expect(newVehicleSchedulesCollection).to.be.instanceOf(VehicleSchedulesCollection);
      });
      it('applies the "libelle"', () => {
        expect(newVehicleSchedulesCollection.libelle).to.equal(`Données de test`);
      });
      it('creates a vehicle schedule item for each vehicle schedule line in the data', () => {
        expect(newVehicleSchedulesCollection.count()).to.equal(oirStyleData.vehicle_schedule.length);
      });
      it('creates the trips and trip points', () => {
        expect(newVehicleSchedulesCollection.items[0].trips.items[0]).to.be.an.instanceOf(Trip);
        expect(newVehicleSchedulesCollection.items[0].trips.items[0].tripPoints.items[0]).to.be.an.instanceOf(TripPoint);
      });
      it(`uses the 'composition' aggregation type`, () => {
        /** This ensures that the parent prop is set to the collection on the vscs, which is useful to link the vscs that
         * are included in each other.
         */
        expect(newVehicleSchedulesCollection.associationType).to.equal('composition');
      });
      describe(`successfully loads the schedules in a way that the inclusions between schedules works`, () => {
        it(`has actual vscs in the vsc props of the vscincloirs items`, () => {
          const rmVsc = newVehicleSchedulesCollection.getByPropName('vscIntId', '5506');
          expect(rmVsc.vscincloirs.first.vsc).to.be.instanceOf(VehicleSchedule);
        });
        it(`is able to reconstitute block activities from multiple vscs`, () => {
          const rmVsc = newVehicleSchedulesCollection.getByPropName('vscIntId', '5506');
          expect(rmVsc.blocks.last.longLoggingOutput).to.equal(expectedString1);
        });
      });
      it(`creates the blocks`);
      it(`creates the ...`);
    });
  });
  describe('#vehicleTasksCollectionOfAllVscs.', function testSuite() {
    this.timeout(5000);
    context(`Given a vsc coll where there used to be a problem ...`, () => {
      /** @type {VehicleSchedulesCollection} */
      let vehicleSchedulesCollection;
      before(async () => {
        vehicleSchedulesCollection = await getTestEntity(jsonSerializedVscColl1path, VehicleSchedulesCollection);
        vehicleSchedulesCollection.forEach((vsc) => checkAndRepairConsistChangesInVsc(vsc));
      });
      it(`is a VehicleTasksCollection`, () => {
        expect(vehicleSchedulesCollection.vehicleTasksCollectionOfAllVscs).to.be.instanceOf(VehicleTasksCollection);
      });
      it(`doesn't have a problem anymore ...`, () => {
        expect(vehicleSchedulesCollection.vehicleTasksCollectionOfAllVscs.getByPropName('label', 'Kk40o9M').blockActivities.llo)
          .to.equal(expectedString2);
        expect(vehicleSchedulesCollection.vehicleTasksCollectionOfAllVscs.getByPropName('label', '5TuaT8x').blockActivities.llo)
          .to.equal(expectedString3);
      });
    });
  });
});

const expectedString1 = `WAz-[7] (vsc: 5506: ow1JpYy0 -  (13))
Voyage (2) - 8iJJMr-(etvk|10:10 → 10:30|XK6Q) (block: WAz-[7])
Voyage (2) - HKlP2r-(bhA2GI|5:44 → 6:14|WZKR5G) (block: WAz-[7])
Voyage (4) - 9a9L23-(XK6Q|10:43 → 11:25|Uotlp) (block: WAz-[7])
Voyage (6) - qye9MM-(etvk|8:10 → 8:57|WZKR5G) (block: WAz-[7])
Maintenance (10000) - [0z]-bhA2GI-(5:13=>5:44) (block: WAz-[7])
Voyage (6) - XpqXpw-(WZKR5G|7:09 → 7:55|etvk) (block: WAz-[7])
Voyage (6) - l5hPFk-(WZKR5G|9:09 → 9:55|etvk) (block: WAz-[7])`;

const expectedString2 = `Maintenance (10001) - [Ow]-HZ22Lc-(07:04;00=>07:06;00) (block: 8n-[13])
Maintenance (10000) - [0z]-HZ22Lc-(07:04;00=>07:06;00) (block: 8n-[13])
Voyage (2) - jMMWEh-(HZ22Lc|07:06;00 → 07:17;00|wBRrM) (block: 8n-[13])
Voyage (6) - f9FUZM-(wBRrM|07:28;00 → 08:23;30|BYRgG) (block: 8n-[13])
Voyage (6) - f9FUZM-(BYRgG|08:26;30 → 09:22;00|ADUZre) (block: 8n-[13])
Voyage (2) - W56emaf-(ADUZre|09:32;00 → 09:43;00|MGAQk9) (block: 8n-[13])
Voyage (2) - N2lsj8w-(MGAQk9|12:08;00 → 12:19;00|ADUZre) (block: 8n-[13])
Voyage (6) - G3tsJr-(ADUZre|12:29;00 → 13:35;00|BYRgG) (block: 8n-[13])
Voyage (2) - lTEoCj-(BYRgG|15:55;00 → 16:05;00|QMX6Ab) (block: 8n-[13])
Changement de composition (14) - Dételage-QMX6Ab-16:05;00-89 (block: 8n-[13])
Changement de composition (15) - Dételage-QMX6Ab-16:05;00-89 (block: ZY-[6])
Voyage (6) - 82ecBG-(QMX6Ab|16:23;00 → 17:09;00|xSJBDD) (block: ZY-[6])
Voyage (6) - k99jhV-(xSJBDD|17:33;00 → 18:03;00|BYRgG) (block: ZY-[6])
Voyage (6) - k99jhV-(BYRgG|18:06;00 → 19:02;00|wBRrM) (block: ZY-[6])
Voyage (6) - 5BFxm4-(wBRrM|19:27;00 → 20:23;30|BYRgG) (block: ZY-[6])
Voyage (6) - 5BFxm4-(BYRgG|20:26;30 → 21:22;00|ADUZre) (block: ZY-[6])`;

const expectedString3 = `Maintenance (10001) - [Ow]-HZ22Lc-(07:04;00=>07:06;00) (block: 8n-[13])
Maintenance (10000) - [0z]-HZ22Lc-(07:04;00=>07:06;00) (block: 8n-[13])
Voyage (2) - jMMWEh-(HZ22Lc|07:06;00 → 07:17;00|wBRrM) (block: 8n-[13])
Voyage (6) - f9FUZM-(wBRrM|07:28;00 → 08:23;30|BYRgG) (block: 8n-[13])
Voyage (6) - f9FUZM-(BYRgG|08:26;30 → 09:22;00|ADUZre) (block: 8n-[13])
Voyage (2) - W56emaf-(ADUZre|09:32;00 → 09:43;00|MGAQk9) (block: 8n-[13])
Voyage (2) - N2lsj8w-(MGAQk9|12:08;00 → 12:19;00|ADUZre) (block: 8n-[13])
Voyage (6) - G3tsJr-(ADUZre|12:29;00 → 13:35;00|BYRgG) (block: 8n-[13])
Voyage (2) - lTEoCj-(BYRgG|15:55;00 → 16:05;00|QMX6Ab) (block: 8n-[13])
Changement de composition (14) - Dételage-QMX6Ab-16:05;00-89 (block: 8n-[13])
Voyage (6) - inGBiW-(QMX6Ab|16:27;00 → 17:23;00|r3Z0y5) (block: 8n-[13])
Voyage (6) - 9Va8GY-(r3Z0y5|17:36;00 → 18:31;30|QMX6Ab) (block: 8n-[13])
Voyage (6) - ewLcBU-(QMX6Ab|18:57;00 → 19:53;00|r3Z0y5) (block: 8n-[13])`;
