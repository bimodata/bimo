const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const BookingCalendarDatesCollection = require('./BookingCalendarDatesCollection');
const ServiceEvolutionsCollection = require('./ServiceEvolutionsCollection');
const ServiceContextsCollection = require('./ServiceContextsCollection');

const childClasses = [BookingCalendarDatesCollection, ServiceEvolutionsCollection, ServiceContextsCollection];

class BookingCalendar extends Item {
  constructor(props) {
    super(props);
    this.bcalBookingId = getAndValidatePropFromProps('bcalBookingId', props, `string`);
    if (!this.bcalBookingId) {
      throw new Error('Pas de PA cible');
    }
    this.bcalCalendarId = getAndValidatePropFromProps('bcalCalendarId', props, `string`);
    /** Par défaut à 2 = 'Autre'. Autres options : 0 ='En vigueur' ou 1 ='Planifié' */
    this.bcalType = getAndValidatePropFromProps('bcalType', props, `string`, '2');
    this.bcalDescription = getAndValidatePropFromProps('bcalDescription', props);
    this.bcalOwner = getAndValidatePropFromProps('bcalOwner', props, `string`, `ADMIN`);
    /** 0 = Privé par défaut */
    this.bcalPublicAccess = getAndValidatePropFromProps('bcalPublicAccess', props, 'string', '0');
    /** 0 = Le calendrier créé n'est pas, par défaut, destiné à assurer la compatibilité d'un ancien calendrier
     * avec la version actuelle d'HASTUS
     */
    this.bcalIsForCompatibility = getAndValidatePropFromProps('bcalIsForCompatibility', props, 'string', '0');
    /** Propriété nécessaire si calendrier pour compatibilité : référence à l'ancien calendrier */
    this.bcalEffectiveCalendarId = getAndValidatePropFromProps('bcalEffectiveCalendarId', props);

    /* Children */
    /** @type {BookingCalendarDatesCollection} */
    this.bookingCalendarDates = getAndValidatePropFromProps(
      'bookingCalendarDates', props,
      BookingCalendarDatesCollection,
      new BookingCalendarDatesCollection(),
      { altPropName: 'booking_calendar_date', parent: this },
    );

    /** @type {ServiceEvolutionsCollection} */
    this.serviceEvolutions = getAndValidatePropFromProps(
      'serviceEvolutions', props,
      ServiceEvolutionsCollection,
      new ServiceEvolutionsCollection(),
      { altPropName: 'service_evolution', parent: this },
    );

    /** @type {ServiceContextsCollection} */
    this.serviceContexts = getAndValidatePropFromProps(
      'serviceContexts', props,
      ServiceContextsCollection,
      new ServiceContextsCollection(),
      { altPropName: 'service_context', parent: this },
    );
  }

  addBCalDate(bcalDate) {
    this.bookingCalendarDates.add(bcalDate);
  }

  get mediumLoggingOutput() {
    return `${this.bcalCalendarId}: ${this.bcalDescription}`
      + `(${this.bcalBookingId}, ${this.bcalType}) - `
      + `${this.bookingCalendarDates?.first?.dateAsIsoDateString} -> ${this.bookingCalendarDates?.last?.dateAsIsoDateString}`;
  }

  get shortLoggingOutput() {
    return `${this.bcalCalendarId}: ${this.bcalDescription} (${this.bcalBookingId})`;
  }
}

BookingCalendar.allChildClasses = getAllChildClasses(childClasses);
BookingCalendar.prototype.serializeModel = serializeThis;
BookingCalendar.parseModel = parseThis;

module.exports = BookingCalendar;
