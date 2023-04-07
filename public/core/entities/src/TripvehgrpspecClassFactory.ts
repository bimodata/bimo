/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const TripvehgrpspecClassFactory = () => {
  class Tripvehgrpspec {
    constructor(props) {
      /** */ this.tripvehgrpspecVehGroup = getAndValidatePropFromProps('tripvehgrpspecVehGroup', props);
      /** */ this.tripvehgrpspecReqType = getAndValidatePropFromProps('tripvehgrpspecReqType', props);
      /** */ this.tripvehgrpspecPriority = getAndValidatePropFromProps('tripvehgrpspecPriority', props);

      /* Children */

      /* Links */
    }
  }

  /* Serialization utilities */
  Tripvehgrpspec.allChildClasses = getAllChildClasses(childClasses);
  Tripvehgrpspec.prototype.serializeModel = serializeThis;
  Tripvehgrpspec.parseModel = parseThis;

  return Tripvehgrpspec;
};

module.exports = TripvehgrpspecClassFactory;
