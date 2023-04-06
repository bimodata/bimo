const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const ServiceEvolutionPeriodClassFactory = ({
  ServiceEvolutionPeriodSchedulesBookingsCollection,
  ServiceContextWeeksCollection,
}) => {
  const childClasses = [ServiceEvolutionPeriodSchedulesBookingsCollection, ServiceContextWeeksCollection];

  class ServiceEvolutionPeriod extends Item {
    constructor(props) {
      super(props);
      this.sevopStartDate = getAndValidatePropFromProps('sevopStartDate', props, `string`);
      this.sevopServiceDefId = getAndValidatePropFromProps('sevopServiceDefId', props, `string`);

      /* Children */
      /** @type {ServiceEvolutionPeriodSchedulesBookingsCollection} */
      this.serviceEvolutionPeriodSchedulesBookings = getAndValidatePropFromProps(
        'serviceEvolutionPeriodSchedulesBookings', props,
        ServiceEvolutionPeriodSchedulesBookingsCollection,
        new ServiceEvolutionPeriodSchedulesBookingsCollection(),
        { altPropName: 'service_evolution_period_schedules_booking', parent: this },
      );

      /** @type {ServiceContextWeeksCollection} */
      this.serviceContextWeeks = getAndValidatePropFromProps(
        'serviceContextWeeks', props,
        ServiceContextWeeksCollection,
        new ServiceContextWeeksCollection(),
        { altPropName: 'service_context_week', parent: this },
      );
    }
  }

  ServiceEvolutionPeriod.allChildClasses = getAllChildClasses(childClasses);
  ServiceEvolutionPeriod.prototype.serializeModel = serializeThis;
  ServiceEvolutionPeriod.parseModel = parseThis;

  return ServiceEvolutionPeriod;
};

module.exports = ServiceEvolutionPeriodClassFactory;
