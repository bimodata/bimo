/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Class definition */
class TripTp {
  constructor(props) {
    /** */ this.ttpPlace = getAndValidatePropFromProps('ttpPlace', props);
    /** */ this.ttpPassingTime = getAndValidatePropFromProps('ttpPassingTime', props);
    /** */ this.ttpRunTimeDiff = getAndValidatePropFromProps('ttpRunTimeDiff', props);
    /** */ this.ttpSkipped = getAndValidatePropFromProps('ttpSkipped', props);
    /** */ this.ttpNote = getAndValidatePropFromProps('ttpNote', props);
    /** */ this.ttpDistance = getAndValidatePropFromProps('ttpDistance', props);
    /** */ this.ttpIsPublic = getAndValidatePropFromProps('ttpIsPublic', props);
    /** */ this.ttpHoldTime = getAndValidatePropFromProps('ttpHoldTime', props);
    /** */ this.ttpHoldType = getAndValidatePropFromProps('ttpHoldType', props);
    /** */ this.ttpIsLoading = getAndValidatePropFromProps('ttpIsLoading', props);

    /* Children */

    /* Links */
  }
}

TripTp.hastusKeywords = ['trip_tp'];
TripTp.hastusObject = 'trip_tp';

/* Serialization utilities */
TripTp.allChildClasses = getAllChildClasses(childClasses);
TripTp.prototype.serializeModel = serializeThis;
TripTp.parseModel = parseThis;

module.exports = TripTp;
