/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Class definition */
class NetworkEvent {
  constructor(props) {
    /** */ this.nevtIdentifier = getAndValidatePropFromProps('nevtIdentifier', props);

    /* Children */

    /* Links */
  }
}

NetworkEvent.hastusKeywords = ['network_event'];
NetworkEvent.hastusObject = 'network_event';

/* Serialization utilities */
NetworkEvent.allChildClasses = getAllChildClasses(childClasses);
NetworkEvent.prototype.serializeModel = serializeThis;
NetworkEvent.parseModel = parseThis;

module.exports = NetworkEvent;
