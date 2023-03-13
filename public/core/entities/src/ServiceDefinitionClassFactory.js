const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const Item = require('@bimo/core-utils-item');

const ServiceDefinitionClassFactory = ({ SdefSchedulingUnitsCollection }) => {
  const childClasses = [SdefSchedulingUnitsCollection];

  class ServiceDefinition extends Item {
    constructor(props) {
      super(props);
      this.sdefIdentifier = getAndValidatePropFromProps('sdefIdentifier', props, `string`);
      this.sdefDescription = getAndValidatePropFromProps('sdefDescription', props, `string`, 'Générée par Lauritz');
      this.sdefOwner = getAndValidatePropFromProps('sdefOwner', props, `string`, 'ADMIN');
      this.sdefDataGroup = getAndValidatePropFromProps('sdefDataGroup', props, `string`);
      this.sdefPublicAccess = getAndValidatePropFromProps('sdefPublicAccess', props, `string`, '1');

      /* Children */
      /** @type {SdefSchedulingUnitsCollection} */
      this.schedulingUnits = getAndValidatePropFromProps(
        'sdefSchedulingUnit', props,
        SdefSchedulingUnitsCollection,
        new SdefSchedulingUnitsCollection(),
        { altPropName: 'sdef_scheduling_unit', parent: this },
      );
    }

    get shortLoggingOutput() {
      return `${this.sdefIdentifier} - ${this.sdefDescription}`;
    }
  }

  ServiceDefinition.allChildClasses = getAllChildClasses(childClasses);
  ServiceDefinition.prototype.serializeModel = serializeThis;
  ServiceDefinition.parseModel = parseThis;

  return ServiceDefinition;
};

module.exports = ServiceDefinitionClassFactory;
