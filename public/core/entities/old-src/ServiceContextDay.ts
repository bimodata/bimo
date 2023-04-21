const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

class ServiceContextDay extends Item {
  constructor(props) {
    super(props);
    this.scdayWeekRank = getAndValidatePropFromProps('scdayWeekRank', props, `string`);
    this.scdayProdPhaseDay = getAndValidatePropFromProps('scdayProdPhaseDay', props, `string`, '0');
    this.scdayApplicMethod = getAndValidatePropFromProps('scdayApplicMethod', props, `string`, '1');
    this.scdaySpecSchedName = getAndValidatePropFromProps('scdaySpecSchedName', props);
    this.scdaySpecSchedType = getAndValidatePropFromProps('scdaySpecSchedType', props, `string`);
    this.scdaySpecSchedScenario = getAndValidatePropFromProps('scdaySpecScenario', props, `string`);
    this.scdaySpecSchedBooking = getAndValidatePropFromProps('scdaySpecBooking', props, `string`);
    this.scdayGetFromCalendarId = getAndValidatePropFromProps('scdayGetFromCalendarId', props, `string`);
    this.scdayGetFromBookingId = getAndValidatePropFromProps('scdayGetFromBookingId', props, `string`);
    this.scdayGetFromContext = getAndValidatePropFromProps('scdayGetFromContext', props, `string`);
    this.scdayGetFromDayRank = getAndValidatePropFromProps('scdayGetFromDayRank', props, `string`);
  }
}

ServiceContextDay.prototype.serializeModel = serializeThis;
ServiceContextDay.parseModel = parseThis;

module.exports = ServiceContextDay;
