/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const TrainPathsCollectionClassFactory = ({
  TrainPath,
  TrainPathsGeneralInfo,
}) => {
  const childClasses = [TrainPath, TrainPathsGeneralInfo];

  /** @extends {Collection<TrainPath>} */
  class TrainPathsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'TrainPath',
        ItemConstructor: TrainPath,
        associationType: 'aggregation',
        businessIdPropName: 'trnpIdentifier',
        ...props,
      });

      /* Unoficial Children */
      /** @type {TrainPathsGeneralInfos} */
      this.trainPathsGeneralInfo = getAndValidatePropFromProps(
        'trainPathsGeneralInfo', props,
        TrainPathsGeneralInfo,
        new TrainPathsGeneralInfo(),
        { altPropName: 'trnpgeninfo', parent: this },
      );
    }

    /**
       *
       * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
       */
    static createFromOirStyleData(oirStyleData) {
      const rawGeneralInfos = oirStyleData.train_path_general_information;
      const rawTrainPaths = oirStyleData.train_path;

      if (!rawGeneralInfos || !rawTrainPaths) {
        throw new Error(`Bad oirStyleData: could not find "train_path_general_information" or "train_path" key`);
      }
      if (rawGeneralInfos.length !== 1) {
        throw new Error(`Bad oirStyleData: there should be exactly one trainPathGeneralInfo line. Got ${rawGeneralInfos.length}`);
      }

      const newTrainPathsCollection = new TrainPathsCollection({
        trainPathsGeneralInfo: rawGeneralInfos[0],
        items: rawTrainPaths,
      });

      return newTrainPathsCollection;
    }

    get self() {
      return this;
    }

    generateOirStyleData() {
      const train_path = this.map((trainPath) => {
        trainPath.train_path_variant = trainPath.trainPathVariants.map((trainPathVariant) => {
          trainPathVariant.train_path_variant_point = trainPathVariant.trainPathVariantPoints && trainPathVariant.trainPathVariantPoints.items;
          trainPathVariant.train_path_variant_date = trainPathVariant.trainPathVariantDates && trainPathVariant.trainPathVariantDates.items;
          return trainPathVariant;
        });
        return trainPath;
      });
      const general_information = [this.trainPathsGeneralInfo];
      return { general_information, train_path };
    }
  }

  TrainPathsCollection.allChildClasses = getAllChildClasses(childClasses);
  TrainPathsCollection.prototype.serializeModel = serializeThis;
  TrainPathsCollection.parseModel = parseThis;

  return TrainPathsCollection;
};

module.exports = TrainPathsCollectionClassFactory;
