const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Linked Classes */
const Trip = require('./Trip');

const childClasses = [Trip];

/* Class definition */
/** @extends {Collection<Trip>} */
class TripsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Trip',
      ItemConstructor: Trip,
      idPropName: `bimoId`,
      businessIdPropName: `trpIntNumber`,
      labelPropName: `shortLoggingOutput`,
      ...props,
    });
  }

  /**
     * Groups all the trips of the collection by trip number
     * @returns {Map<String, Trip[]>} a map of trips arrays, indexed by trip number
     */
  get tripsByTripNumber() {
    if (!this._tripsByTripNumber) {
      this._tripsByTripNumber = this.groupByProp(`trpNumber`);
    }
    return this._tripsByTripNumber;
  }

  get mediumLoggingOutput() {
    return this.map((trip) => trip.shortLoggingOutput);
  }
}

/* Serialization utilities */
TripsCollection.allChildClasses = getAllChildClasses(childClasses);
TripsCollection.prototype.serializeModel = serializeThis;
TripsCollection.parseModel = parseThis;

module.exports = TripsCollection;
