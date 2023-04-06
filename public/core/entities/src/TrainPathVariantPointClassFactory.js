const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const childClasses = [];

const TrainPathVariantPointClassFactory = () => {
  class TrainPathVariantPoint extends Item {
    constructor(props) {
      super(props);

      this.trnpvptPlace = getAndValidatePropFromProps('trnpvptPlace', props, `string`);
      if (!this.trnpvptPlace) {
        throw new Error('Pas de nom de lieu');
      }
      this.trnpvptArrivalTime = getAndValidatePropFromProps('trnpvptArrivalTime', props, `string`);
      this.trnpvptLoadTime = getAndValidatePropFromProps('trnpvptLoadTime', props, `string`);
      this.trnpvptNoStopping = getAndValidatePropFromProps('trnpvptNoStopping', props, `string`);
      this.trnpvptPassMidnight = getAndValidatePropFromProps('trnpvptPassMidnight', props, `string`);
    }

    get shortLoggingOutput() {
      return `${this.trnpvptPlace} (A:${this.trnpvptArrivalTime},`
        + ` L:${this.trnpvptLoadTime}, noStopping:${this.trnpvptNoStopping}, passMidnight:${this.trnpvptPassMidnight})`;
    }
  }

  TrainPathVariantPoint.allChildClasses = getAllChildClasses(childClasses);
  TrainPathVariantPoint.prototype.serializeModel = serializeThis;
  TrainPathVariantPoint.parseModel = parseThis;

  return TrainPathVariantPoint;
};

module.exports = TrainPathVariantPointClassFactory;
