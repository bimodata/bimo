/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const NetworkEventClassFactory = () => {
  class NetworkEvent {
    constructor(props) {
      /** */ this.nevtIdentifier = getAndValidatePropFromProps('nevtIdentifier', props);

      /* Children */

      /* Links */
    }
  }

  /* Serialization utilities */
  NetworkEvent.allChildClasses = getAllChildClasses(childClasses);
  NetworkEvent.prototype.serializeModel = serializeThis;
  NetworkEvent.parseModel = parseThis;

  return NetworkEvent;
};

module.exports = NetworkEventClassFactory;
