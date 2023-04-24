/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Class definition */
class Tripvehgrpspec {
  constructor(props) {
    /** */ this.tripvehgrpspecVehGroup = getAndValidatePropFromProps('tripvehgrpspecVehGroup', props);
    /** */ this.tripvehgrpspecReqType = getAndValidatePropFromProps('tripvehgrpspecReqType', props);
    /** */ this.tripvehgrpspecPriority = getAndValidatePropFromProps('tripvehgrpspecPriority', props);

    /* Children */

    /* Links */
  }
}

Tripvehgrpspec.hastusKeywords = ['tripvehgroupspec'];
Tripvehgrpspec.hastusObject = 'tripvehgrpspec';

/* Serialization utilities */
Tripvehgrpspec.allChildClasses = getAllChildClasses(childClasses);
Tripvehgrpspec.prototype.serializeModel = serializeThis;
Tripvehgrpspec.parseModel = parseThis;

module.exports = Tripvehgrpspec;
