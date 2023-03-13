const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const Item = require('@bimo/core-utils-item');

const ServiceContextClassFactory = ({
  ServiceContextParentsCollection,
  ServiceContextIntervalsCollection,
  ServiceEvolutionPeriodsCollection,
}) => {
  const childClasses = [ServiceContextParentsCollection, ServiceContextIntervalsCollection, ServiceEvolutionPeriodsCollection];

  class ServiceContext extends Item {
    constructor(props) {
      super(props);
      this.sctxName = getAndValidatePropFromProps('sctxName', props, `string`, 'Base');
      this.sctxUserCreated = getAndValidatePropFromProps('sctxUserCreated', props, `string`, '1');
      this.sctxIsMainBase = getAndValidatePropFromProps('sctxIsMainBase', props, `string`, '1');
      this.sctxIsBase = getAndValidatePropFromProps('sctxIsBase', props, 'string', '1');
      this.sctxDescription = getAndValidatePropFromProps('sctxDescription', props, `string`);
      this.sctxColor = getAndValidatePropFromProps('sctxColor', props, 'string');
      this.sctxColorInternalNumber = getAndValidatePropFromProps('sctxColorInternalNumber', props, 'string');
      this.sctxWeekColumns = getAndValidatePropFromProps('sctxWeekColumns', props);
      this.sctxIsolatedWeekday = getAndValidatePropFromProps('sctxIsolatedWeekday', props);
      this.sctxIntervalSource = getAndValidatePropFromProps('sctxIntervalSource', props, 'string', '0');
      this.sctxDateFilter = getAndValidatePropFromProps('sctxDateFilter', props);
      this.sctxNetworkEventRelated = getAndValidatePropFromProps('sctxNetworkEventRelated', props);
      this.sctxOwner = getAndValidatePropFromProps('sctxOwner', props, 'string', 'ADMIN');
      this.sctxPublicAccess = getAndValidatePropFromProps('sctxPublicAccess', props, 'string', '1');

      /* Children */
      /** @type {ServiceContextParentsCollection} */
      this.serviceContextParents = getAndValidatePropFromProps(
        'serviceContextParents', props,
        ServiceContextParentsCollection,
        new ServiceContextParentsCollection(),
        { altPropName: 'service_context_parent', parent: this },
      );

      /** @type {ServiceContextIntervalsCollection} */
      this.serviceContextIntervals = getAndValidatePropFromProps(
        'serviceContextIntervals', props,
        ServiceContextIntervalsCollection,
        new ServiceContextIntervalsCollection(),
        { altPropName: 'service_context_interval', parent: this },
      );

      /** @type {ServiceEvolutionPeriodsCollection} */
      this.serviceEvolutionPeriods = getAndValidatePropFromProps(
        'serviceEvolutionPeriods', props,
        ServiceEvolutionPeriodsCollection,
        new ServiceEvolutionPeriodsCollection(),
        { altPropName: 'service_evolution_period', parent: this },
      );
    }
  }

  ServiceContext.allChildClasses = getAllChildClasses(childClasses);
  ServiceContext.prototype.serializeModel = serializeThis;
  ServiceContext.parseModel = parseThis;

  return ServiceContext;
};

module.exports = ServiceContextClassFactory;
