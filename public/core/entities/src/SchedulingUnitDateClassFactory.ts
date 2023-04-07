const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const SchedulingUnitDateClassFactory = () => {
  class SchedulingUnitDate extends Item {
    constructor(props) {
      super(props);
      this.scudSchedUnitName = getAndValidatePropFromProps('scudSchedUnitName', props, `string`);
      this.scudSchedUnitType = getAndValidatePropFromProps('scudSchedUnitType', props, `string`, '1100');
      this.scudProdPhaseDate = getAndValidatePropFromProps('scudProdPhaseDate', props, `string`, '0');
      this.scudApplicMethod = getAndValidatePropFromProps('scudApplicMethod', props, `string`, '2');
      this.scudSpecSchedName = getAndValidatePropFromProps('scudSpecSchedName', props, `string`);
      this.scudSpecSchedType = getAndValidatePropFromProps('scudSpecSchedType', props);
      this.scudSpecSchedScenario = getAndValidatePropFromProps('scudSpecSchedScenario', props);
      this.scudSpecSchedBooking = getAndValidatePropFromProps('scudSpecSchedBooking', props, `string`);
      this.scudGetFromSource = getAndValidatePropFromProps('scudGetFromSource', props, `string`);
      this.scudGetFromDayRank = getAndValidatePropFromProps('scudGetFromDayRank', props, `string`);
      this.scudGetFromCalendarId = getAndValidatePropFromProps('scudGetFromCalendarId', props);
      this.scudGetFromBookingId = getAndValidatePropFromProps('scudGetFromBookingId', props);
      this.scudGetFromDate = getAndValidatePropFromProps('scudGetFromDate', props);
      this.scudProdBookingId = getAndValidatePropFromProps('scudProdBookingId', props);
      this.scudProdSchedType = getAndValidatePropFromProps('scudProdSchedType', props);
    }

    get mediumLoggingOutput() {
      return `${this.scudSchedUnitName} (${this.scudApplicMethod}) :`
        + `${this.scudSpecSchedName} - ${this.scudSpecSchedType} ${this.scudSpecSchedScenario} `;
    }

    get shortLoggingOutput() {
      return `${this.scudSchedUnitName} (${this.scudApplicMethod})`;
    }
  }

  return SchedulingUnitDate;
};

module.exports = SchedulingUnitDateClassFactory;
