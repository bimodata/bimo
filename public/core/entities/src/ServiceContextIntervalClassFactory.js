const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const ServiceContextIntervalClassFactory = () => {
  class ServiceContextInterval extends Item {
    constructor(props) {
      super(props);
      this.scintStartDate = getAndValidatePropFromProps('scintStartDate', props, `string`);
      this.scintEndDate = getAndValidatePropFromProps('scintEndDate', props, `string`);
      this.scintSunday = getAndValidatePropFromProps('scintSunday', props, `string`);
      this.scintMonday = getAndValidatePropFromProps('scintMonday', props, `string`);
      this.scintTuesday = getAndValidatePropFromProps('scintTuesday', props, `string`);
      this.scintWednesday = getAndValidatePropFromProps('scintWednesday', props, `string`);
      this.scintThursday = getAndValidatePropFromProps('scintThursday', props, `string`);
      this.scintFriday = getAndValidatePropFromProps('scintFriday', props, `string`);
      this.scintSaturday = getAndValidatePropFromProps('scintSaturday', props, `string`);
    }
  }

  ServiceContextInterval.prototype.serializeModel = serializeThis;
  ServiceContextInterval.parseModel = parseThis;

  return ServiceContextInterval;
};

module.exports = ServiceContextIntervalClassFactory;
