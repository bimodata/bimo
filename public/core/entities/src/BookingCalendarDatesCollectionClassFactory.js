const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');

const { Collection } = require('@bimo/core-utils-collection');

const BookingCalendarDatesCollectionClassFactory = ({ BookingCalendarDate }) => {
  const childClasses = [BookingCalendarDate];

  /** @extends {Collection<BookingCalendarDate>} */
  class BookingCalendarDatesCollection extends Collection {
    constructor(props) {
      super({
        itemName: 'BookingCalendarDate',
        ItemConstructor: BookingCalendarDate,
        associationType: 'aggregation',
        businessIdPropName: 'bcaldDate',
        ...props,
      });
    }

    getByIsoDate(isoDate, { refreshCache = false }) {
      const bcaldsByIsoDate = this.groupByProp('dateAsIsoDateString', { refreshCache });
      const bcalds = bcaldsByIsoDate.get(isoDate);
      if (!bcalds) {
        return null;
      }
      if (bcalds.length > 1) {
        throw new Error('Date répétée');
      }
      return bcalds[0];
    }

    getByDate(date) {
      return (this.getByBusinessId(date));
    }

    sortByDate() {
      this.sort((a, b) => (a.dateAsIsoDateString > b.dateAsIsoDateString ? 1 : -1));
    }

    get first() {
      this.sortByDate();
      return this.items[0];
    }

    get last() {
      this.sortByDate();
      return this.items[this.items.length - 1];
    }
  }
  BookingCalendarDatesCollection.allChildClasses = getAllChildClasses(childClasses);
  BookingCalendarDatesCollection.prototype.serializeModel = serializeThis;
  BookingCalendarDatesCollection.parseModel = parseThis;

  return BookingCalendarDatesCollection;
};

module.exports = BookingCalendarDatesCollectionClassFactory;
