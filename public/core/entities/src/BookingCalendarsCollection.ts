/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BookingsCollection, BookingsCollectionProps } from "./BookingsCollection";
import { BookingCalendar, BookingCalendarProps } from "./BookingCalendar";
import { ServiceDefinitionsCollection, ServiceDefinitionsCollectionProps } from "./ServiceDefinitionsCollection";
import { SchedulingUnitsCollection, SchedulingUnitsCollectionProps } from "./SchedulingUnitsCollection";

const childClasses = [BookingCalendar];


export interface BookingCalendarsCollectionProps extends ExtendedCollectionProps<BookingCalendar, BookingCalendarProps> {
}

export class BookingCalendarsCollection extends Collection<BookingCalendar, BookingCalendarProps> {
  constructor(props: BookingCalendarsCollectionProps = {}) {
    super({
      itemName: 'BookingCalendar',
      ItemConstructor: BookingCalendar,
      associationType: 'aggregation',
      ...props,
    });

    /* Unofficial children */
    /** @type {ServiceDefinitionsCollection} */
    this.serviceDefinitions = gavpfp(
      'serviceDefinition', props,
      ServiceDefinitionsCollection,
      new ServiceDefinitionsCollection(),
      { altPropName: 'service_definition', parent: this },
    );

    /** @type {SchedulingUnitsCollection} */
    this.schedulingUnits = gavpfp(
      'schedulingUnit', props,
      SchedulingUnitsCollection,
      new SchedulingUnitsCollection(),
      { altPropName: 'scheduling_unit', parent: this },
    );

    /** @type {BookingsCollection} */
    this.bookings = gavpfp(
      'booking', props,
      BookingsCollection,
      new BookingsCollection(),
      { altPropName: 'booking', parent: this },
    );
  }

  get self() {
    return this;
  }

  generateOirStyleData() {
    const booking_calendar = this.map((bookingCalendar) => {
      bookingCalendar.booking_calendar_date = bookingCalendar.bookingCalendarDates.map((bookingCalendarDate) => {
        bookingCalendarDate.scheduling_unit_date = bookingCalendarDate.schedulingUnitDates && bookingCalendarDate.schedulingUnitDates.items;
        return bookingCalendarDate;
      });
      bookingCalendar.service_evolution = bookingCalendar.serviceEvolutions.map((serviceEvolution) => serviceEvolution);
      bookingCalendar.service_context = bookingCalendar.serviceContexts.map((serviceContext) => {
        serviceContext.service_context_parent = serviceContext.serviceContextParents && serviceContext.serviceContextParents.items;
        serviceContext.service_ctx_interval = serviceContext.serviceContextIntervals && serviceContext.serviceContextIntervals.items;
        serviceContext.serv_evol_period = serviceContext.serviceEvolutionPeriods.map((servEvolPeriod) => {
          // eslint-disable-next-line max-len
          servEvolPeriod.sevop_schedules_booking = servEvolPeriod.serviceEvolutionPeriodSchedulesBookings && servEvolPeriod.serviceEvolutionPeriodSchedulesBookings.items;
          servEvolPeriod.service_ctx_week = servEvolPeriod.serviceContextWeeks.map((serviceContextWeek) => {
            // eslint-disable-next-line max-len
            serviceContextWeek.service_ctx_day = serviceContextWeek.serviceContextDays && serviceContextWeek.serviceContextDays.items;
            return serviceContextWeek;
          });
          return servEvolPeriod;
        });
        return serviceContext;
      });

      return bookingCalendar;
    });

    const service_definition = this.serviceDefinitions.map((sdef) => {
      sdef.sdef_scheduling_unit = sdef.schedulingUnits.map((sdefSchedUnit) => {
        sdefSchedUnit.sdef_scheduling_unit_incl = sdefSchedUnit.includedSchedulingUnits;
        return sdefSchedUnit;
      });
      return sdef;
    });

    const booking = this.bookings.items;

    const scheduling_unit = this.schedulingUnits.map((schedUnit) => {
      schedUnit.sched_unit_route = schedUnit.schedulingUnitRoutes?.items;
      return schedUnit;
    });

    return { booking_calendar, service_definition, scheduling_unit, booking };
  }
}

BookingCalendarsCollection.allChildClasses = getAllChildClasses(childClasses);



export default BookingCalendarsCollection;
