const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

class ServiceEvolutionPeriodSchedulesBooking extends Item {
  constructor(props) {
    super(props);
    this.bkIdentifier = getAndValidatePropFromProps('bkIdentifier', props, `string`);
  }
}

ServiceEvolutionPeriodSchedulesBooking.prototype.serializeModel = serializeThis;
ServiceEvolutionPeriodSchedulesBooking.parseModel = parseThis;

module.exports = ServiceEvolutionPeriodSchedulesBooking;
