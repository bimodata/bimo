const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { cleanStringUsingRegexAndReplacePairs } = require('@bimo/core-utils-string');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const Item = require('@bimo/core-utils-item');

const BookingCalendarDateClassFactory = ({ SchedulingUnitDatesCollection }) => {
  const childClasses = [SchedulingUnitDatesCollection];

  class BookingCalendarDate extends Item {
    constructor(props) {
      super(props);
      /**
       * FORMAT DE DATE pour BookingCalendarDates : jj/mm/aaaa.
       */
      const date = getAndValidatePropFromProps('bcaldDate', props);
      if (date.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
        this.bcaldDate = cleanStringUsingRegexAndReplacePairs(date, [['/^(\\d{4})-(\\d{2})-(\\d{2})$/', '$3/$2/$1']]);
      }
      else {
        this.bcaldDate = date;
      }
      this.bcaldServiceDefId = getAndValidatePropFromProps('bcaldServiceDefId', props, `string`);

      /* Children */
      /** @type {SchedulingUnitDatesCollection} */
      this.schedulingUnitDates = getAndValidatePropFromProps(
        'schedulingUnitDates', props,
        SchedulingUnitDatesCollection,
        new SchedulingUnitDatesCollection(),
        { altPropName: 'scheduling_unit_date', parent: this },
      );
    }

    get dateAsIsoDateString() {
      return this._getAndSetCachedValue(
        'dateAsIsoDateString',
        () => cleanStringUsingRegexAndReplacePairs(this.bcaldDate, [['/^(\\d{2})/(\\d{2})/(\\d{4})$/', '$3-$2-$1']]),
      );
    }

    addSchedUnitDate(schedulingUnitDate) {
      this.schedulingUnitDates.add(schedulingUnitDate);
    }

    get mediumLoggingOutput() {
      return `${this.bcaldDate} (${this.bcaldServiceDefId}) - (${this.schedulingUnitDates.length} scheduling units)`;
    }

    get shortLoggingOutput() {
      return `${this.bcaldDate}`;
    }
  }

  BookingCalendarDate.allChildClasses = getAllChildClasses(childClasses);
  BookingCalendarDate.prototype.serializeModel = serializeThis;
  BookingCalendarDate.parseModel = parseThis;

  return BookingCalendarDate;
};

module.exports = BookingCalendarDateClassFactory;
