/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Class definition */
class TripShift {
  constructor(props) {
    /** */ this.tripshiftTripNo = getAndValidatePropFromProps('tripshiftTripNo', props);
    /** */ this.tripshiftActualShift = getAndValidatePropFromProps('tripshiftActualShift', props);

    /* Children */

    /* Links */
  }
}

TripShift.hastusKeywords = ['trip_shift'];
TripShift.hastusObject = 'trip_shift';

/* Serialization utilities */
TripShift.allChildClasses = getAllChildClasses(childClasses);
TripShift.prototype.serializeModel = serializeThis;
TripShift.parseModel = parseThis;

module.exports = TripShift;
