const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const childClasses = [];

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

module.exports = TrainPathVariantDate;
