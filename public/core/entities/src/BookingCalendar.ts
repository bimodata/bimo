import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BookingCalendarDatesCollection, BookingCalendarDatesCollectionProps } from "./BookingCalendarDatesCollection";
import { ServiceEvolutionsCollection, ServiceEvolutionsCollectionProps } from "./ServiceEvolutionsCollection";
import { ServiceContextsCollection, ServiceContextsCollectionProps } from "./ServiceContextsCollection";

const childClasses = [BookingCalendarDatesCollection, ServiceEvolutionsCollection, ServiceContextsCollection];

export interface BookingCalendarProps extends ExtendedItemProps {
  bcalBookingId?: string;
}

export class BookingCalendar extends Item<BookingCalendar> {
  bcalBookingId?: string;
  constructor(props: BookingCalendarProps) {
    super(props);
    this.bcalBookingId = gavpfp('bcalBookingId', props, `string`);
    if (!this.bcalBookingId) {
      throw new Error('Pas de PA cible');
    }
    this.bcalCalendarId = gavpfp('bcalCalendarId', props, `string`);
    /** Par défaut à 2 = 'Autre'. Autres options : 0 ='En vigueur' ou 1 ='Planifié' */
    this.bcalType = gavpfp('bcalType', props, `string`, '2');
    this.bcalDescription = gavpfp('bcalDescription', props);
    this.bcalOwner = gavpfp('bcalOwner', props, `string`, `ADMIN`);
    /** 0 = Privé par défaut */
    this.bcalPublicAccess = gavpfp('bcalPublicAccess', props, 'string', '0');
    /** 0 = Le calendrier créé n'est pas, par défaut, destiné à assurer la compatibilité d'un ancien calendrier
     * avec la version actuelle d'HASTUS
     */
    this.bcalIsForCompatibility = gavpfp('bcalIsForCompatibility', props, 'string', '0');
    /** Propriété nécessaire si calendrier pour compatibilité : référence à l'ancien calendrier */
    this.bcalEffectiveCalendarId = gavpfp('bcalEffectiveCalendarId', props);

    /* Children */
    /** @type {BookingCalendarDatesCollection} */
    this.bookingCalendarDates = gavpfp(
      'bookingCalendarDates', props,
      BookingCalendarDatesCollection,
      new BookingCalendarDatesCollection(),
      { altPropName: 'booking_calendar_date', parent: this },
    );

    /** @type {ServiceEvolutionsCollection} */
    this.serviceEvolutions = gavpfp(
      'serviceEvolutions', props,
      ServiceEvolutionsCollection,
      new ServiceEvolutionsCollection(),
      { altPropName: 'service_evolution', parent: this },
    );

    /** @type {ServiceContextsCollection} */
    this.serviceContexts = gavpfp(
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



export default BookingCalendar;