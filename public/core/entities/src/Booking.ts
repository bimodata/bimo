const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Linked Classes */

const childClasses = [];

/* Class definition */
class Booking {
  constructor(props) {
    this.bimoId = getAndValidatePropFromProps('bimoId', props);
    /** */ this.bkIdentifier = getAndValidatePropFromProps('bkIdentifier', props, `string`);
    /** */ this.bkDescription = getAndValidatePropFromProps('bkDescription', props, `string`);
    /** */ this.bkDateStart = getAndValidatePropFromProps('bkDateStart', props, `string`);
    /** */ this.bkDateEnd = getAndValidatePropFromProps('bkDateEnd', props, `string`);
    /** */ this.bkDataGroup = getAndValidatePropFromProps('bkDataGroup', props, `string`);
    /** */ this.bkTrainPathAdministrativeYear = getAndValidatePropFromProps('bkTrainPathAdministrativeYear', props, `string`);
  }
}

Booking.hastusKeywords = ['booking'];
Booking.hastusObject = 'booking';

/* Serialization utilities */
Booking.allChildClasses = getAllChildClasses(childClasses);
Booking.prototype.serializeModel = serializeThis;
Booking.parseModel = parseThis;

module.exports = Booking;
