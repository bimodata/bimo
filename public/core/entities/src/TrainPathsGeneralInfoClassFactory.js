const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const Item = require('@bimo/core-utils-item');

const childClasses = [];

const TrainPathsGeneralInfoClassFactory = () => {
  class TrainPathsGeneralInfo extends Item {
    constructor(props = {}) {
      super(props);
      this.trnpgeninfoSource = getAndValidatePropFromProps('trnpgeninfoSource', props, `string`);
      this.trnpgeninfoImportType = getAndValidatePropFromProps('trnpgeninfoImportType', props, `string`);
      this.trnpgeninfoAdministrativeYear = getAndValidatePropFromProps('trnpgeninfoAdministrativeYear', props, `string`);
    }
  }

  TrainPathsGeneralInfo.allChildClasses = getAllChildClasses(childClasses);
  TrainPathsGeneralInfo.prototype.serializeModel = serializeThis;
  TrainPathsGeneralInfo.parseModel = parseThis;

  return TrainPathsGeneralInfo;
};

module.exports = TrainPathsGeneralInfoClassFactory;
