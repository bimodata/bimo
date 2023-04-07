const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const TrainPathVariantClassFactory = ({
  TrainPathVariantDatesCollection,
  TrainPathVariantPointsCollection,
}) => {
  const childClasses = [TrainPathVariantPointsCollection, TrainPathVariantDatesCollection];

  class TrainPathVariant extends Item {
    constructor(props) {
      super(props);

      this.trnpvTrainPathRimId = getAndValidatePropFromProps('trnpvTrainPathRimId', props, `string`);

      /* Children */
      /** @type {TrainPathVariantPointsCollection} */
      this.trainPathVariantPoints = getAndValidatePropFromProps(
        'trainPathVariantPoints', props,
        TrainPathVariantPointsCollection,
        new TrainPathVariantPointsCollection(),
        { altPropName: 'train_path_variant_point', parent: this },
      );
      /** @type {TrainPathVariantDatesCollection} */
      this.trainPathVariantDates = getAndValidatePropFromProps(
        'trainPathVariantDates', props,
        TrainPathVariantDatesCollection,
        new TrainPathVariantDatesCollection(),
        { altPropName: 'train_path_date', parent: this },
      );
    }

    get shortLoggingOutput() {
      return `${this.trnpvTrainPathRimId}: ${this.trainPathVariantPoints.length} points et ${this.trainPathVariantDates.length} dates`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}
      ----------------------------------
      ${this.trainPathVariantPoints.items.map((item) => item.mediumLoggingOutput)}`;
    }

    get longLoggingOutput() {
      return `${this.mediumLoggingOutput}
      ----------------------------------
      ${this.trainPathVariantDates.items.map((item) => item.mediumLoggingOutput)}`;
    }
  }

  TrainPathVariant.allChildClasses = getAllChildClasses(childClasses);
  TrainPathVariant.prototype.serializeModel = serializeThis;
  TrainPathVariant.parseModel = parseThis;

  return TrainPathVariant;
};

module.exports = TrainPathVariantClassFactory;
