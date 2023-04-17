/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Class definition */
class OvernightLink {
  constructor(props) {
    /** */ this.olInternalNumber = getAndValidatePropFromProps('olInternalNumber', props);
    /** */ this.olOriginTripNo = getAndValidatePropFromProps('olOriginTripNo', props);
    /** */ this.olOriginOrigTripNo = getAndValidatePropFromProps('olOriginOrigTripNo', props);
    /** */ this.olOriginPlace = getAndValidatePropFromProps('olOriginPlace', props);
    /** */ this.olOriginRoute = getAndValidatePropFromProps('olOriginRoute', props);
    /** */ this.olOriginTime = getAndValidatePropFromProps('olOriginTime', props);
    /** */ this.olDestinationTripNo = getAndValidatePropFromProps('olDestinationTripNo', props);
    /** */ this.olDestinationOrigTripNo = getAndValidatePropFromProps('olDestinationOrigTripNo', props);
    /** */ this.olDestinationPlace = getAndValidatePropFromProps('olDestinationPlace', props);
    /** */ this.olDestinationRoute = getAndValidatePropFromProps('olDestinationRoute', props);
    /** */ this.olDestinationTime = getAndValidatePropFromProps('olDestinationTime', props);
    /** */ this.olDhLayAt = getAndValidatePropFromProps('olDhLayAt', props);
    /** */ this.olSchedType = getAndValidatePropFromProps('olSchedType', props);

    /* Children */

    /* Links */
  }
}

OvernightLink.hastusKeywords = ['overnight_link'];
OvernightLink.hastusObject = 'overnight_link';

/* Serialization utilities */
OvernightLink.allChildClasses = getAllChildClasses(childClasses);
OvernightLink.prototype.serializeModel = serializeThis;
OvernightLink.parseModel = parseThis;

module.exports = OvernightLink;
