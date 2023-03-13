const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const Item = require('@bimo/core-utils-item');

const childClasses = [];

const TrainPathVariantDateClassFactory = () => {
  class TrainPathVariantDate extends Item {
    constructor(props) {
      super(props);

      this.trnpdEffectiveDate = getAndValidatePropFromProps('trnpdEffectiveDate', props, `string`);
      this.trnpdStatusOir = getAndValidatePropFromProps('trnpdStatusOir', props, `string`);
    }

    get shortLoggingOutput() {
      return this.trnpdEffectiveDate;
    }
  }

  TrainPathVariantDate.allChildClasses = getAllChildClasses(childClasses);
  TrainPathVariantDate.prototype.serializeModel = serializeThis;
  TrainPathVariantDate.parseModel = parseThis;

  return TrainPathVariantDate;
};

module.exports = TrainPathVariantDateClassFactory;
