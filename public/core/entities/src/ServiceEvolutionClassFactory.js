const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const Item = require('@bimo/core-utils-item');

const ServiceEvolutionClassFactory = () => {
  class ServiceEvolution extends Item {
    constructor(props) {
      super(props);
      this.sevoStartDate = getAndValidatePropFromProps('sevoStartDate', props, `string`);
      this.sevoDisplayName = getAndValidatePropFromProps('sevoDisplayName', props, `string`);
      this.sevoDescription = getAndValidatePropFromProps('sevoDescription', props, `string`);
      this.sevoComment = getAndValidatePropFromProps('sevoComment', props);
      this.sevoDatetimeStamp = getAndValidatePropFromProps('sevoDatetimeStamp', props, `string`);
      this.sevoUserStamp = getAndValidatePropFromProps('sevoUserStamp', props, 'string');
    }
  }

  ServiceEvolution.prototype.serializeModel = serializeThis;
  ServiceEvolution.parseModel = parseThis;

  return ServiceEvolution;
};

module.exports = ServiceEvolutionClassFactory;
